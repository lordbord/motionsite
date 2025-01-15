-- Create the signatures table
create table public.signatures (
  id uuid default gen_random_uuid() primary key,
  message text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Set up Row Level Security (RLS)
alter table public.signatures enable row level security;

-- Allow anyone to read signatures
create policy "Anyone can read signatures"
  on public.signatures for select
  using (true);

-- Allow anyone to insert signatures
create policy "Anyone can insert signatures"
  on public.signatures for insert
  with check (true); 