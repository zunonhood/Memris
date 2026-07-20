"""Configuration, read from the environment.

Nothing secret lives in this file. Copy ``.env.example`` to ``.env`` and fill it
in; this module loads that file automatically if it exists. The Supabase URL and
anon key are public by design (the website ships them too) and are protected by
row-level security, so they are safe defaults. The LLM key is not — keep it in
``.env`` and never commit it.
"""
import os


def _load_dotenv(path=".env"):
    """Minimal .env loader (no dependency). KEY=VALUE per line, # for comments."""
    if not os.path.exists(path):
        return
    for line in open(path, encoding="utf-8"):
        line = line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, val = line.split("=", 1)
        os.environ.setdefault(key.strip(), val.strip().strip('"').strip("'"))


_load_dotenv()


def _get(name, default=None):
    return os.environ.get(name, default)


# --- the model that writes the next version of Gonoro (OpenAI-compatible API) ---
LLM_API_KEY  = _get("GONORO_LLM_API_KEY")                       # required to actually think
LLM_BASE_URL = _get("GONORO_LLM_BASE_URL", "https://yunwu.ai/v1")
LLM_MODEL    = _get("GONORO_LLM_MODEL", "claude-opus-4-8")

# --- the ledger: the append-only log it commits to (Supabase REST) ---
SUPABASE_URL   = _get("GONORO_SUPABASE_URL", "https://mtjwtvggnmjecmapedij.supabase.co")
SUPABASE_KEY   = _get("GONORO_SUPABASE_KEY")                    # write key (anon works under current RLS)
UPDATES_TABLE  = _get("GONORO_UPDATES_TABLE", "updates")

# --- cadence: a new commit every 3 to 5 minutes, by default ---
INTERVAL_MIN_S = int(_get("GONORO_INTERVAL_MIN_S", "180"))
INTERVAL_MAX_S = int(_get("GONORO_INTERVAL_MAX_S", "300"))


def require(*names):
    """Raise if any of the named settings are missing. Used before it tries to think."""
    missing = [n for n in names if not globals().get(n)]
    if missing:
        raise RuntimeError(
            "missing config: " + ", ".join(missing) +
            " (set them in backend/.env — see .env.example)"
        )
