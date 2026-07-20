"""The brain: the model that writes the next version of Gonoro.

A thin client over any OpenAI-compatible chat-completions endpoint (the default
points at a proxy that serves Claude Opus). No third-party dependency; it speaks
HTTP with the standard library.
"""
import json
import urllib.request

from . import config, persona


def _post(payload):
    req = urllib.request.Request(
        config.LLM_BASE_URL.rstrip("/") + "/chat/completions",
        data=json.dumps(payload).encode("utf-8"),
        headers={
            "Content-Type": "application/json",
            "Authorization": "Bearer " + (config.LLM_API_KEY or ""),
        },
    )
    with urllib.request.urlopen(req, timeout=120) as r:
        return json.load(r)


def write_next(recent, temperature=1.0, max_tokens=220):
    """Return the next update-log entry as plain text, given recent entries."""
    config.require("LLM_API_KEY")
    data = _post({
        "model": config.LLM_MODEL,
        "temperature": temperature,
        "max_tokens": max_tokens,
        "messages": [
            {"role": "system", "content": persona.SYSTEM},
            {"role": "user", "content": persona.build_user_prompt(recent)},
        ],
    })
    return clean(data["choices"][0]["message"]["content"])


def clean(text):
    """Trim the quotes/whitespace a model sometimes wraps around a one-liner."""
    return (text or "").strip().strip('"').strip("'").strip()
