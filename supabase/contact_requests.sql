create table if not exists public.contact_requests (
  id bigint generated always as identity primary key,
  name text not null,
  car text not null,
  email text not null,
  phone text not null,
  service text not null,
  details text not null,
  source text not null default 'website',
  status text not null default 'new',
  created_at timestamptz not null default now()
);

alter table public.contact_requests
  add column if not exists scheduled_for timestamptz,
  add column if not exists booking_notes text,
  add column if not exists archived_at timestamptz,
  add column if not exists receipt_reference text,
  add column if not exists receipt_issued_at timestamptz,
  add column if not exists receipt_location text,
  add column if not exists receipt_price text,
  add column if not exists receipt_payment_method text,
  add column if not exists receipt_work_summary text,
  add column if not exists receipt_notes text;

alter table public.contact_requests
  alter column email drop not null,
  alter column details drop not null;

create index if not exists contact_requests_created_at_idx
  on public.contact_requests (created_at desc);

create index if not exists contact_requests_scheduled_for_idx
  on public.contact_requests (scheduled_for asc);

create index if not exists contact_requests_archived_at_idx
  on public.contact_requests (archived_at desc);

alter table public.contact_requests enable row level security;

drop policy if exists "Allow public contact request inserts" on public.contact_requests;
create policy "Allow public contact request inserts"
  on public.contact_requests
  for insert
  to anon, authenticated
  with check (true);

drop policy if exists "Allow public contact request reads" on public.contact_requests;
create policy "Allow public contact request reads"
  on public.contact_requests
  for select
  to anon, authenticated
  using (true);

drop policy if exists "Allow public contact request updates" on public.contact_requests;
create policy "Allow public contact request updates"
  on public.contact_requests
  for update
  to anon, authenticated
  using (true)
  with check (true);
