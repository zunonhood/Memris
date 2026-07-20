// Reads Gonoro's self-update log from Supabase and renders it (US Eastern time).
// Uses only the public anon key (safe by design; writes are done by a local script, not here).
(function () {
  const SB_URL = "https://mtjwtvggnmjecmapedij.supabase.co";
  const SB_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im10and0dmdnbm1qZWNtYXBlZGlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ1NTUxMjMsImV4cCI6MjEwMDEzMTEyM30.d5Wg7mzN5cK09sztQkcQTwT4At7Lhdy2o2xMG8XyNgY";

  const list = document.getElementById("updates-list");
  if (!list || !window.supabase) return;

  const sb = window.supabase.createClient(SB_URL, SB_KEY);
  const esc = (s) => (s || "").replace(/[&<>"]/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  const fmt = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/New_York", year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", hour12: false, timeZoneName: "short"
  });
  const stamp = (ts) => fmt.format(new Date(ts)).replace(",", "");

  function render(rows) {
    if (!rows.length) { list.innerHTML = "no entries yet."; return; }
    list.innerHTML = rows.map((r) =>
      '<span class="title"><img src="images/berry.png">' + stamp(r.created_at) + ':</span><br>'
      + esc(r.body) + '<br><br>'
    ).join("");
  }

  async function load() {
    const { data, error } = await sb.from("updates")
      .select("*").order("created_at", { ascending: false }).limit(60);
    if (!error && data) render(data);
    else if (error) list.innerHTML = "updates unavailable (" + error.message + ")";
  }

  sb.channel("gonoro-updates")
    .on("postgres_changes", { event: "INSERT", schema: "public", table: "updates" }, load)
    .subscribe();

  load();
  setInterval(load, 30000); // safety poll in case realtime drops
})();
