-- =============================================================================
-- Histórico mostra o nome/apelido do admin (vindo do perfil em "Minha conta")
-- =============================================================================

alter table public.activity_log add column if not exists actor_name text;

create or replace function public.log_activity()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  rec jsonb := case when tg_op = 'DELETE' then to_jsonb(old) else to_jsonb(new) end;
  meta jsonb := auth.jwt() -> 'user_metadata';
begin
  -- Reordenar (só position/updated_at mudam) não polui o log
  if tg_op = 'UPDATE'
     and (to_jsonb(new) - 'position' - 'updated_at') = (to_jsonb(old) - 'position' - 'updated_at') then
    return new;
  end if;

  insert into public.activity_log (table_name, action, record_id, label, actor_email, actor_name)
  values (
    tg_table_name,
    lower(tg_op),
    rec ->> 'id',
    coalesce(rec ->> 'name', rec ->> 'title', rec ->> 'alt', rec ->> 'event_name'),
    auth.jwt() ->> 'email',
    nullif(coalesce(meta ->> 'nickname', split_part(meta ->> 'full_name', ' ', 1)), '')
  );

  return case when tg_op = 'DELETE' then old else new end;
end;
$$;

revoke execute on function public.log_activity() from public, anon, authenticated;
