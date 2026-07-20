from gonoro import agent


def test_tick_commits_what_the_brain_writes(monkeypatch):
    committed = {}
    monkeypatch.setattr(agent.ledger, "recent", lambda n=8: ["older line"])
    monkeypatch.setattr(agent.brain, "write_next", lambda recent: "a brand new line")
    monkeypatch.setattr(agent.ledger, "commit", lambda body: committed.setdefault("body", body) or True)

    out = agent.tick()
    assert out == "a brand new line"
    assert committed["body"] == "a brand new line"


def test_dry_run_never_commits(monkeypatch):
    monkeypatch.setattr(agent.ledger, "recent", lambda n=8: [])
    monkeypatch.setattr(agent.brain, "write_next", lambda recent: "unshipped thought")
    def _boom(body):
        raise AssertionError("dry-run must not commit")
    monkeypatch.setattr(agent.ledger, "commit", _boom)

    assert agent.tick(dry_run=True) == "unshipped thought"


def test_empty_brain_output_is_skipped(monkeypatch):
    monkeypatch.setattr(agent.ledger, "recent", lambda n=8: [])
    monkeypatch.setattr(agent.brain, "write_next", lambda recent: "")
    monkeypatch.setattr(agent.ledger, "commit", lambda body: (_ for _ in ()).throw(AssertionError("should not commit")))
    assert agent.tick() is None
