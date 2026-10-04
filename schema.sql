create table comments(
 id uuid primary key default gen_random_uuid(),
 name text not null check (char_length(name) between 1 and 60),
 rating int not null check (rating between 1 and 5),
 comment text not null check (char_length(comment) between 1 and 600),
 status text not null default 'pending' check (status in ('pending','approved','rejected')),
 created_at timestamptz not null default now());
alter table comments enable row level security;
create policy "public submit pending" on comments for insert to anon with check (status='pending');
create policy "public read approved" on comments for select to anon using (status='approved');
create policy "admin all" on comments for all to authenticated using (true) with check (true);
