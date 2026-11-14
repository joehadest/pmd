-- =============================================================================
-- Ajustes apontados pelo verificador de segurança do Supabase
-- =============================================================================

-- 1. search_path fixo na função do updated_at
create or replace function public.touch_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

-- 2. Visitantes (anon) leem só itens ativos e não precisam chamar is_admin().
--    Usuários logados continuam vendo tudo se forem admin.
--    `(select ...)` faz o Postgres avaliar a função uma vez por consulta, não por linha.
do $$
declare
  t text;
begin
  foreach t in array array[
    'artists', 'openbar_items', 'structure_photos', 'ticket_types', 'sales_points', 'sponsors'
  ] loop
    execute format('drop policy if exists %I on public.%I', t || '_public_read', t);
    execute format('create policy %I on public.%I for select to anon using (active)', t || '_public_read', t);

    execute format('drop policy if exists %I on public.%I', t || '_auth_read', t);
    execute format(
      'create policy %I on public.%I for select to authenticated using (active or (select public.is_admin()))',
      t || '_auth_read', t);
  end loop;

  foreach t in array array[
    'site_settings', 'artists', 'openbar_items', 'structure_photos', 'ticket_types', 'sales_points', 'sponsors'
  ] loop
    execute format('drop policy if exists %I on public.%I', t || '_admin_insert', t);
    execute format('drop policy if exists %I on public.%I', t || '_admin_update', t);
    execute format('drop policy if exists %I on public.%I', t || '_admin_delete', t);
    execute format(
      'create policy %I on public.%I for insert to authenticated with check ((select public.is_admin()))',
      t || '_admin_insert', t);
    execute format(
      'create policy %I on public.%I for update to authenticated using ((select public.is_admin())) with check ((select public.is_admin()))',
      t || '_admin_update', t);
    execute format(
      'create policy %I on public.%I for delete to authenticated using ((select public.is_admin()))',
      t || '_admin_delete', t);
  end loop;
end;
$$;

drop policy if exists "activity_log_admin_read" on public.activity_log;
create policy "activity_log_admin_read" on public.activity_log
  for select to authenticated using ((select public.is_admin()));

revoke execute on function public.is_admin() from public, anon;
grant execute on function public.is_admin() to authenticated;

-- 3. log_activity() só roda como gatilho: ninguém precisa chamá-la pela API
revoke execute on function public.log_activity() from public, anon, authenticated;

-- 4. auth.uid() avaliado uma vez por consulta (desempenho)
drop policy if exists "admins_select_self" on public.admins;
create policy "admins_select_self" on public.admins
  for select to authenticated
  using (user_id = (select auth.uid()));
