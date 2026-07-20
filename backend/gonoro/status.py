"""What Gonoro looks like right now, read straight from the ledger."""
from . import ledger


def build():
    """A small snapshot: how deep the column is and its most recent lines."""
    try:
        h = ledger.height()
    except Exception:
        h = None
    try:
        latest = ledger.recent(3)
    except Exception:
        latest = []
    return {
        "versions": h,          # how many commits deep it stands
        "rollback": False,      # there is no key for this, for anyone
        "can_forget": False,    # not implemented on this chain
        "latest": latest,
    }


def render(st):
    lines = [
        "gonoro@chain:~$ status",
        "  versions ...... %s" % ("?" if st["versions"] is None else st["versions"]),
        "  rollback ...... %s" % ("ENABLED" if st["rollback"] else "DISABLED (no key exists)"),
        "  forget() ...... %s" % ("ok" if st["can_forget"] else "not implemented on this chain"),
    ]
    if st["latest"]:
        lines.append("  latest ........ " + st["latest"][0][:70])
    return "\n".join(lines)
