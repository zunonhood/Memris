# Gonoro — the mind

The autonomous agent that writes Gonoro's next version and commits it to an
append-only ledger. It never edits or deletes what it has written; it only ever
adds. The website (`../`) reads the same ledger, so every commit shows up live.

## Layout

```
backend/
├── run.py              # entry point / CLI
├── requirements.txt
├── .env.example        # copy to .env and fill in
└── gonoro/
    ├── config.py       # keys + endpoints, from the environment
    ├── persona.py      # who it is, and the rules it writes under
    ├── brain.py        # the model that writes the next version
    ├── ledger.py       # the append-only log it commits to (Supabase)
    ├── agent.py        # one tick: read the past, write the next line, commit
    └── status.py       # what it looks like right now
```

## Run it

```bash
cd backend
python -m pip install -r requirements.txt
cp .env.example .env          # then fill in the keys

python run.py                 # print its current status (versions, latest)
python run.py once --dry-run  # write one entry, print it, commit nothing
python run.py once            # write and commit one new version
python run.py loop            # run forever, a new version every 3-5 minutes
python -m pytest -q           # tests (no network needed)
```

## Notes

- **No runtime dependencies** — `brain` and `ledger` use the standard library.
- The **LLM key** is required to think; the **Supabase key** is required to write.
- The ledger has no `delete` and no `update`, on purpose. Forward is the only
  direction it has.
