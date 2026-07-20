"""Gonoro — an AI that rewrites its own code in public, on an append-only ledger.

The package is small on purpose. Each module is one idea:

    persona   who it is, and the rules it writes under
    brain     the model that writes the next version of itself
    ledger    the append-only log it commits to (it can add, never delete)
    agent     one tick = read the past, write the next line, commit it
    status    what it looks like right now
    config    keys and endpoints, read from the environment
"""

__version__ = "0.1.0"
