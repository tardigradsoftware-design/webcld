-- supabase/migrations/0001_contacts.sql
-- ---------------------------------------------------------------------------
-- Tardigrad Software — iletişim formu kayıt tablosu
-- Uygulama: Supabase CLI ile  `supabase db push`  veya Dashboard > SQL Editor
--
-- Güvenlik modeli:
--   * Tablo YALNIZCA service_role anahtarıyla yazılabilir (Next.js API rotası).
--   * anon / authenticated rolleri hiçbir satırı okuyamaz (RLS kapalı devre).
--   * updated_at tetikleyici ile otomatik güncellenir.
--   * Yeni kayıt geldiğinde pg_notify ile haber verilir (opsiyonel web hook).
-- ---------------------------------------------------------------------------

create extension if not exists "pgcrypto";

create table if not exists public.contacts (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),

  -- Form alanları (src/lib/validations.ts ile aynı kurallar)
  name          text not null check (char_length(name) between 3 and 120),
  email         text not null check (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]{2,}$'),
  phone         text check (phone is null or phone ~* '^(\+90|0090|0)?5\d{9}$'),
  company       text,
  service       text,
  city          text,
  message       text not null check (char_length(message) between 20 and 2000),

  -- Onay ve izleme
  kvkk_accepted boolean not null default false,
  source_url    text,
  ip_address    inet,
  user_agent    text,

  -- Operasyonel durum akışı
  status        text not null default 'new'
                check (status in ('new', 'contacted', 'proposal', 'won', 'lost', 'spam')),
  assigned_to   text,
  notes         text,

  -- Spam skorları (reCAPTCHA v3)
  recaptcha_score numeric(3,2),
  honeypot_hit  boolean not null default false
);

comment on table public.contacts is
  'İletişim formu talepleri. Yalnızca service_role yazabilir; RLS tüm anonim erişimi kapatır.';

create index if not exists contacts_created_at_idx on public.contacts (created_at desc);
create index if not exists contacts_status_idx     on public.contacts (status);
create index if not exists contacts_city_idx       on public.contacts (city);
create index if not exists contacts_service_idx    on public.contacts (service);

-- updated_at tetikleyicisi ---------------------------------------------------
create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists contacts_touch_updated_at on public.contacts;
create trigger contacts_touch_updated_at
  before update on public.contacts
  for each row
  execute function public.touch_updated_at();

-- Yeni kayıt bildirimi (opsiyonel: Edge Function / webhook tetikleyebilir) ---
create or replace function public.notify_new_contact()
returns trigger
language plpgsql
as $$
begin
  perform pg_notify('contact_created', new.id::text);
  return new;
end;
$$;

drop trigger if exists contacts_notify_new on public.contacts;
create trigger contacts_notify_new
  after insert on public.contacts
  for each row
  execute function public.notify_new_contact();

-- Row Level Security ---------------------------------------------------------
alter table public.contacts enable row level security;

-- Varsayılan: hiçbir rol satır göremez. Aşağıdaki politikalar yalnızca
-- service_role (Next.js API rotası) için tam erişim açar.
drop policy if exists "contacts_service_role_all" on public.contacts;
create policy "contacts_service_role_all"
  on public.contacts
  for all
  to service_role
  using (true)
  with check (true);

-- anon ve authenticated için explicit RETAIN politikası YOKTUR:
-- RLS etkin olduğu için bu roller tüm sorgularda 0 satır görür.

-- Görünüm: operasyon paneli için özet (isteğe bağlı, service_role'a açık) ----
create or replace view public.contacts_recent as
select
  id,
  created_at,
  name,
  email,
  city,
  service,
  status,
  left(message, 160) as message_preview
from public.contacts
where status <> 'spam'
order by created_at desc
limit 200;

revoke all on public.contacts_recent from anon, authenticated;
grant select on public.contacts_recent to service_role;

-- İstatistik görünümü (dashboard kartları) -----------------------------------
create or replace view public.contacts_stats as
select
  count(*) filter (where created_at >= now() - interval '7 days')  as last_7_days,
  count(*) filter (where created_at >= now() - interval '30 days') as last_30_days,
  count(*) filter (where status = 'new')                           as open_count,
  count(*) filter (where status = 'won')                           as won_count,
  count(*)                                                         as total_count
from public.contacts;

revoke all on public.contacts_stats from anon, authenticated;
grant select on public.contacts_stats to service_role;
