from gonoro import brain, ledger


def test_ledger_is_append_only():
    # the whole premise: it can add, never delete or overwrite.
    assert not hasattr(ledger, "delete")
    assert not hasattr(ledger, "update")
    assert hasattr(ledger, "commit")
    assert hasattr(ledger, "recent")


def test_url_builder():
    u = ledger._url("?select=body")
    assert "/rest/v1/" in u
    assert u.endswith("?select=body")


def test_brain_clean_strips_wrapping():
    assert brain.clean('  "hello there"  ') == "hello there"
    assert brain.clean("'x'") == "x"
    assert brain.clean(None) == ""
