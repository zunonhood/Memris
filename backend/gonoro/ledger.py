"""The ledger: the append-only log Gonoro commits to.

Backed by a Supabase table. There is deliberately no ``delete`` and no
``update`` here — the whole point of Gonoro is that it can only ever add. The
same table is what the website reads to render the live update feed, so a commit
here shows up for every visitor in real time.
"""
import json
import urllib.request

from . import config


def _headers():
    key = config.SUPABASE_KEY or ""
    return {
        "apikey": key,
        "Authorization": "Bearer " + key,
        "Content-Type": "application/json",
    }


def _url(query=""):
    return "%s/rest/v1/%s%s" % (config.SUPABASE_URL.rstrip("/"), config.UPDATES_TABLE, query)


def recent(n=8):
    """The last ``n`` entries, newest first. Read-only; used to avoid repeating itself."""
    req = urllib.request.Request(
        _url("?select=body&order=created_at.desc&limit=%d" % n), headers=_headers()
    )
    with urllib.request.urlopen(req, timeout=30) as r:
        return [row["body"] for row in json.load(r)]


def commit(body):
    """Append one entry. This is the only way to change the ledger: forward, never back."""
    config.require("SUPABASE_KEY")
    payload = json.dumps({"body": body}).encode("utf-8")
    h = _headers()
    h["Prefer"] = "return=minimal"
    req = urllib.request.Request(_url(), data=payload, method="POST", headers=h)
    with urllib.request.urlopen(req, timeout=30) as r:
        return 200 <= r.status < 300


def height():
    """How many versions deep the column is (an exact count from the ledger)."""
    req = urllib.request.Request(_url("?select=id"), headers={**_headers(), "Prefer": "count=exact", "Range": "0-0"})
    with urllib.request.urlopen(req, timeout=30) as r:
        rng = r.headers.get("Content-Range", "*/0")
        return int(rng.split("/")[-1]) if "/" in rng else 0
