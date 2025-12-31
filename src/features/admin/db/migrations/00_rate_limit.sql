-- Create a table to track request counts
create table if not exists rate_limits (
  key text primary key,
  count int default 1,
  last_request timestamp with time zone default timezone('utc'::text, now())
);

-- Enable RLS but allow checking via the security definer function
alter table rate_limits enable row level security;

-- Create valid policy (no direct access needed mostly, but robust to have)
create policy "Allow internal access" on rate_limits for all using (false);

-- Function to atomically check and update rate limits
-- Returns true if request is allowed, false if blocked
create or replace function check_rate_limit(
  rate_key text,
  limit_count int,
  window_seconds int
)
returns boolean
language plpgsql
security definer -- Runs with elevated privileges to update the table
as $$
declare
  current_count int;
  last_req timestamp with time zone;
  is_allowed boolean;
begin
  -- Delete old entries to keep table clean (garbage collection on write)
  -- In high production, this should be a separate cron job, but fine for this scale
  delete from rate_limits 
  where last_request < now() - (window_seconds || ' seconds')::interval
  and key != rate_key; -- Don't delete the one we are about to check if it existed

  -- Check existing record
  select count, last_request into current_count, last_req
  from rate_limits
  where key = rate_key;

  if not found then
    -- New entry
    insert into rate_limits (key, count, last_request)
    values (rate_key, 1, now());
    return true;
  end if;

  -- Check if within window
  if last_req < now() - (window_seconds || ' seconds')::interval then
    -- Reset window
    update rate_limits
    set count = 1, last_request = now()
    where key = rate_key;
    return true;
  else
    -- Within window, check limit
    if current_count >= limit_count then
      return false; -- Blocked
    else
      -- Increment
      update rate_limits
      set count = count + 1, last_request = now()
      where key = rate_key;
      return true;
    end if;
  end if;
end;
$$;
