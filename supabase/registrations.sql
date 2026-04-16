create extension if not exists pgcrypto;

create table if not exists public.registrations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text not null,
  pass_type text not null,
  amount numeric not null,
  transaction_id text not null,
  status text not null default 'pending',
  ticket_url text,
  created_at timestamptz not null default now(),
  event_slug text,
  event_name text,
  lead_college text,
  designation text,
  city text,
  linkedin text,
  "current_role" text,
  college_name text,
  student_year text,
  company_name text,
  role_title text
);

alter table public.registrations
  add column if not exists ticket_url text,
  add column if not exists event_slug text,
  add column if not exists event_name text,
  add column if not exists lead_college text,
  add column if not exists designation text,
  add column if not exists city text,
  add column if not exists linkedin text,
  add column if not exists "current_role" text,
  add column if not exists college_name text,
  add column if not exists student_year text,
  add column if not exists company_name text,
  add column if not exists role_title text;

alter table public.registrations enable row level security;

drop policy if exists "Allow insert" on public.registrations;
create policy "Allow insert"
on public.registrations
for insert
with check (true);

drop policy if exists "Allow read" on public.registrations;
create policy "Allow read"
on public.registrations
for select
using (true);

drop policy if exists "Allow update" on public.registrations;
create policy "Allow update"
on public.registrations
for update
using (true)
with check (true);
