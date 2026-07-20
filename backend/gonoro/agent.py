"""The agent: one tick = read the past, write the next line of itself, commit it.

This is the whole loop. It never edits anything it has written; it only ever
appends. The website reads the same ledger, so every commit is visible to
everyone the moment it lands.
"""
import random
import time

from . import brain, ledger


def tick(dry_run=False):
    """One self-rewrite: look at recent history, write the next entry, commit it."""
    recent = ledger.recent(8)
    entry = brain.write_next(recent)
    if not entry:
        print("[agent] brain returned nothing; skipping.")
        return None
    if dry_run:
        print("[agent] dry-run, not committing:\n  " + entry)
        return entry
    ledger.commit(entry)
    print("[agent] committed: " + entry[:90])
    return entry


def loop(min_s=180, max_s=300):
    """Run forever: a new version every ``min_s``–``max_s`` seconds. Ctrl+C to stop."""
    print("[agent] running. a new commit every %d-%d seconds. ctrl-c to stop." % (min_s, max_s))
    while True:
        try:
            tick()
        except Exception as e:
            print("[agent] tick error:", e)
        time.sleep(random.randint(min_s, max_s))
