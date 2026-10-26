-- Cookie consent log (append-only event log; one row per Accept/Reject click).
-- Written only by /api/cookie-consent using the server-side service key.
-- Row Level Security is enabled with NO policies, so the public (anon) key can
-- neither read nor write this table.
--
-- Data minimisation: no raw IP address and no full user-agent are stored.
-- ip_hash is a keyed one-way hash (see CONSENT_HASH_SALT); UTM / referrer fields
-- are filled only when the visitor accepted.
--
-- Retention: dispose of rows per the Data Retention and Disposal Policy, e.g.
--   delete from public.cookie_consents where created_at < now() - interval '24 months';

create table if not exists public.cookie_consents (
  id              uuid primary key default gen_random_uuid(),
  consent_id      uuid        not null,                       -- anonymous per-browser id
  decision        text        not null check (decision in ('accepted', 'rejected')),
  analytics       boolean     not null,
  marketing       boolean     not null,
  event           text        not null check (event in ('given', 'changed')),
  policy_version  text        not null,
  landing_path    text,
  referrer_host   text,
  utm_source      text,
  utm_medium      text,
  utm_campaign    text,
  utm_term        text,
  utm_content     text,
  device_class    text,                                       -- mobile | tablet | desktop | unknown
  browser         text,                                       -- family only, e.g. Chrome
  country         text,                                       -- ISO code from the hosting edge, if present
  ip_hash         text,                                       -- HMAC-SHA256, truncated
  created_at      timestamptz not null default now(),
  constraint cookie_consents_choice_consistent
    check ((decision = 'accepted' and analytics and marketing)
        or (decision = 'rejected' and not analytics and not marketing))
);

create index if not exists cookie_consents_created_at_idx on public.cookie_consents (created_at desc);
create index if not exists cookie_consents_consent_id_idx on public.cookie_consents (consent_id);

alter table public.cookie_consents enable row level security;
