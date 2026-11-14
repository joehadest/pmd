-- =============================================================================
-- Camarote PMD — esquema do painel admin
-- Conteúdo do site (configurações + listas), administradores, log de
-- atividades e bucket de imagens. Leitura pública; escrita só para admins.
-- =============================================================================

create extension if not exists pgcrypto;

-- -----------------------------------------------------------------------------
-- Administradores
-- -----------------------------------------------------------------------------
create table if not exists public.admins (
  user_id    uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.admins enable row level security;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.admins where user_id = auth.uid());
$$;

grant execute on function public.is_admin() to anon, authenticated;

drop policy if exists "admins_select_self" on public.admins;
create policy "admins_select_self" on public.admins
  for select to authenticated
  using (user_id = auth.uid());

-- -----------------------------------------------------------------------------
-- Utilitário: updated_at automático
-- -----------------------------------------------------------------------------
create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

-- -----------------------------------------------------------------------------
-- Configurações gerais (linha única, id = 1)
-- -----------------------------------------------------------------------------
create table if not exists public.site_settings (
  id                   smallint primary key default 1 check (id = 1),

  -- Evento
  event_name           text not null default 'Camarote PMD 2026',
  edition              text not null default 'Alto Folia 2026',
  organizer            text not null default 'Bloco Pode Mangar Deu',
  date_label           text not null default '28 e 29 de março',
  date_short           text not null default '28 & 29/03',
  date_days            text not null default 'Sábado e Domingo',
  city                 text not null default 'Alto do Rodrigues',
  state                text not null default 'RN',

  -- Hero
  hero_title_1         text not null default 'Camarote',
  hero_title_2         text not null default 'PMD 2026',
  hero_lead            text not null default '',

  -- Ingressos
  tickets_url          text not null default '',
  tickets_url_label    text not null default '',
  tickets_subtitle     text not null default '',
  batch_label          text not null default '',
  batch_validity       text not null default '',

  -- Mídia
  video_url            text not null default '/video/pmd-experiencia.mp4',
  openbar_poster_url   text not null default '',

  -- Contatos
  instagram_handle     text not null default '@podemangardeu',
  instagram_url        text not null default 'https://instagram.com/podemangardeu',
  commercial_phone     text not null default '',
  commercial_message   text not null default '',
  pousada_phone        text not null default '',
  pousada_phone_display text not null default '',
  footer_about         text not null default '',

  -- Seções visíveis no site
  sections             jsonb not null default
    '{"video":true,"lineup":true,"openbar":true,"structure":true,"tickets":true,"sales":true,"instagram":true,"sponsors":true,"pousada":true}'::jsonb,

  updated_at           timestamptz not null default now()
);

-- -----------------------------------------------------------------------------
-- Listas de conteúdo
-- -----------------------------------------------------------------------------
create table if not exists public.artists (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  image_url  text not null default '',
  time_label text not null default '',
  confirmed  boolean not null default true,
  active     boolean not null default true,
  position   integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.openbar_items (
  id         uuid primary key default gen_random_uuid(),
  title      text not null,
  detail     text not null default '',
  active     boolean not null default true,
  position   integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.structure_photos (
  id         uuid primary key default gen_random_uuid(),
  image_url  text not null,
  alt        text not null default '',
  active     boolean not null default true,
  position   integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.ticket_types (
  id           uuid primary key default gen_random_uuid(),
  name         text not null,
  people_label text not null default '',
  price        numeric(10, 2) not null default 0,
  per_person   numeric(10, 2),
  featured     boolean not null default false,
  perks        text[] not null default '{}',
  purchase_url text not null default '',
  active       boolean not null default true,
  position     integer not null default 0,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create table if not exists public.sales_points (
  id         uuid primary key default gen_random_uuid(),
  city       text not null,
  name       text not null,
  address    text not null default '',
  hours      text not null default '',
  active     boolean not null default true,
  position   integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.sponsors (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  logo_url    text not null default '',
  scale       numeric(3, 2) not null default 1 check (scale between 0.5 and 2.5),
  website_url text not null default '',
  active      boolean not null default true,
  position    integer not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- -----------------------------------------------------------------------------
-- Log de atividades (alimenta "Últimas alterações" no painel)
-- -----------------------------------------------------------------------------
create table if not exists public.activity_log (
  id          bigint generated always as identity primary key,
  table_name  text not null,
  action      text not null check (action in ('insert', 'update', 'delete')),
  record_id   text,
  label       text,
  actor_email text,
  created_at  timestamptz not null default now()
);

create index if not exists activity_log_created_at_idx on public.activity_log (created_at desc);

create or replace function public.log_activity()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  rec jsonb := case when tg_op = 'DELETE' then to_jsonb(old) else to_jsonb(new) end;
begin
  -- Reordenar (só position/updated_at mudam) não polui o log
  if tg_op = 'UPDATE'
     and (to_jsonb(new) - 'position' - 'updated_at') = (to_jsonb(old) - 'position' - 'updated_at') then
    return new;
  end if;

  insert into public.activity_log (table_name, action, record_id, label, actor_email)
  values (
    tg_table_name,
    lower(tg_op),
    rec ->> 'id',
    coalesce(rec ->> 'name', rec ->> 'title', rec ->> 'alt', rec ->> 'event_name'),
    auth.jwt() ->> 'email'
  );

  return case when tg_op = 'DELETE' then old else new end;
end;
$$;

-- -----------------------------------------------------------------------------
-- Triggers, RLS e permissões para todas as tabelas de conteúdo
-- -----------------------------------------------------------------------------
do $$
declare
  t text;
begin
  foreach t in array array[
    'site_settings', 'artists', 'openbar_items', 'structure_photos',
    'ticket_types', 'sales_points', 'sponsors'
  ] loop
    execute format('alter table public.%I enable row level security', t);

    execute format('drop trigger if exists %I on public.%I', t || '_touch', t);
    execute format(
      'create trigger %I before update on public.%I for each row execute function public.touch_updated_at()',
      t || '_touch', t);

    execute format('drop trigger if exists %I on public.%I', t || '_log', t);
    execute format(
      'create trigger %I after insert or update or delete on public.%I for each row execute function public.log_activity()',
      t || '_log', t);

    execute format('grant select on public.%I to anon, authenticated', t);
    execute format('grant insert, update, delete on public.%I to authenticated', t);

    execute format('drop policy if exists %I on public.%I', t || '_admin_insert', t);
    execute format('drop policy if exists %I on public.%I', t || '_admin_update', t);
    execute format('drop policy if exists %I on public.%I', t || '_admin_delete', t);
    execute format(
      'create policy %I on public.%I for insert to authenticated with check (public.is_admin())',
      t || '_admin_insert', t);
    execute format(
      'create policy %I on public.%I for update to authenticated using (public.is_admin()) with check (public.is_admin())',
      t || '_admin_update', t);
    execute format(
      'create policy %I on public.%I for delete to authenticated using (public.is_admin())',
      t || '_admin_delete', t);
  end loop;
end;
$$;

-- Leitura: configurações são públicas; itens de lista só quando ativos (admin vê tudo)
drop policy if exists "site_settings_public_read" on public.site_settings;
create policy "site_settings_public_read" on public.site_settings
  for select to anon, authenticated using (true);

do $$
declare
  t text;
begin
  foreach t in array array[
    'artists', 'openbar_items', 'structure_photos', 'ticket_types', 'sales_points', 'sponsors'
  ] loop
    execute format('drop policy if exists %I on public.%I', t || '_public_read', t);
    execute format(
      'create policy %I on public.%I for select to anon, authenticated using (active or public.is_admin())',
      t || '_public_read', t);
  end loop;
end;
$$;

alter table public.activity_log enable row level security;
grant select on public.activity_log to authenticated;
drop policy if exists "activity_log_admin_read" on public.activity_log;
create policy "activity_log_admin_read" on public.activity_log
  for select to authenticated using (public.is_admin());

-- -----------------------------------------------------------------------------
-- Storage: bucket público para imagens enviadas pelo painel
-- -----------------------------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'site-media', 'site-media', true, 10485760,
  array['image/webp', 'image/png', 'image/jpeg', 'image/svg+xml', 'video/mp4']
)
on conflict (id) do nothing;

drop policy if exists "site_media_public_read" on storage.objects;
create policy "site_media_public_read" on storage.objects
  for select using (bucket_id = 'site-media');

drop policy if exists "site_media_admin_insert" on storage.objects;
create policy "site_media_admin_insert" on storage.objects
  for insert to authenticated with check (bucket_id = 'site-media' and public.is_admin());

drop policy if exists "site_media_admin_update" on storage.objects;
create policy "site_media_admin_update" on storage.objects
  for update to authenticated using (bucket_id = 'site-media' and public.is_admin());

drop policy if exists "site_media_admin_delete" on storage.objects;
create policy "site_media_admin_delete" on storage.objects
  for delete to authenticated using (bucket_id = 'site-media' and public.is_admin());
