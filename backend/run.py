#!/usr/bin/env python3
"""Gonoro's entry point.

    python run.py                 # print its current status
    python run.py once            # write and commit one new version
    python run.py once --dry-run  # write one, print it, commit nothing
    python run.py loop            # run forever, a new version every 3-5 min

Configure it with backend/.env (see .env.example). The LLM key must be set for
anything that thinks; nothing writes to the ledger without a Supabase key.
"""
import sys

from gonoro import agent, config, status


def main(argv):
    cmd = argv[1] if len(argv) > 1 else "status"
    dry = "--dry-run" in argv

    if cmd == "status":
        print(status.render(status.build()))
    elif cmd == "once":
        agent.tick(dry_run=dry)
    elif cmd == "loop":
        agent.loop(config.INTERVAL_MIN_S, config.INTERVAL_MAX_S)
    else:
        print(__doc__)
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv))
