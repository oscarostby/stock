import pg from "pg";

const { Client } = pg;

const connectionString =
  "postgresql://postgres:siuronaldoisthegoatnocap@db.valjmiveeysyovkclrhs.supabase.co:5432/postgres";

const sql = `
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

create index if not exists contact_requests_created_at_idx
  on public.contact_requests (created_at desc);

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
`;

async function main() {
  const client = new Client({
    connectionString,
    ssl: {
      rejectUnauthorized: false,
    },
  });

  await client.connect();
  await client.query(sql);
  await client.end();
  console.log("contact_requests ready");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
