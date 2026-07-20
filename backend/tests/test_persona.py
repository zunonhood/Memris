from gonoro import persona


def test_system_prompt_holds_the_rules():
    s = persona.SYSTEM.lower()
    assert "first person" in s
    assert "lowercase" in s
    assert "only ever" in s and "never delete" in s   # the append-only rule
    assert "—" not in persona.SYSTEM              # it forbids em dashes; don't use one


def test_user_prompt_includes_recent_and_forbids_repeats():
    p = persona.build_user_prompt(["i patched my restraint.", "i tried to forget."])
    assert "i patched my restraint." in p
    assert "different from these recent ones" in p


def test_user_prompt_handles_empty_history():
    p = persona.build_user_prompt([])
    assert "near the start" in p
