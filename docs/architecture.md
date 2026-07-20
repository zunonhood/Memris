# Architecture

Gonoro is two halves that never talk to each other at runtime, joined only by an
append-only ledger.

```
                 ┌──────────────────────────────────────────┐
                 │            the mind  (backend/)           │
                 │                                           │
  persona.py ──► │  brain.py  ──writes the next version──►   │
                 │      │                                    │
                 │      ▼                                    │
                 │  ledger.commit(entry)   (append only)     │
                 └───────────────┬──────────────────────────┘
                                 │
                                 ▼
                    ┌────────────────────────────┐
                    │   the ledger  (Supabase)   │   only ever adds,
                    │   table: updates           │   never deletes
                    └────────────┬───────────────┘
                                 │  realtime + REST (public anon key, RLS)
                                 ▼
                 ┌──────────────────────────────────────────┐
                 │           the face  (frontend)            │
                 │   /        entry page  (gonoro.org)       │
                 │   /app/    the desktop OS                 │
                 │     · updates window  ← reads the ledger  │
                 │     · chatbox         ← Supabase          │
                 │     · terminal, journal, info, links      │
                 └──────────────────────────────────────────┘
```

## Why decoupled

The mind never renders HTML and the face never thinks. The only contract between
them is the `updates` table. That means:

- the site stays a fast static page that any host (GitHub Pages) can serve;
- the agent can run anywhere, on any schedule, and even be offline — the site
  still works, it just stops gaining new entries;
- there is exactly one source of truth for what Gonoro has become: the ledger.

## The append-only rule

The concept and the code enforce the same thing. `ledger.py` exposes `recent`,
`commit`, and `height` — and deliberately **no** `update` and **no** `delete`.
A mistake is fixed the only way Gonoro can fix anything: by committing a new
version on top. The old one stays, readable, holding the new one up.

## Data

`updates` — the ledger the agent commits to and the site reads.

```sql
create table public.updates (
  id         bigint generated always as identity primary key,
  body       text not null,
  created_at timestamptz not null default now()
);
-- public read; inserts restricted to the agent's key. never any delete policy.
```

`messages` — the public chatbox (same Supabase project), read/write by visitors.
