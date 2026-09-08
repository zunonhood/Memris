// Memris whisper box -- data backed by the existing Supabase project.
// Fill these two in with your Supabase project values, then reload.
const SUPABASE_URL = "https://mtjwtvggnmjecmapedij.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im10and0dmdnbm1qZWNtYXBlZGlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ1NTUxMjMsImV4cCI6MjEwMDEzMTEyM30.d5Wg7mzN5cK09sztQkcQTwT4At7Lhdy2o2xMG8XyNgY";

(function () {
  const box = document.getElementById("chat-messages");
  const form = document.getElementById("chat-form");
  const status = document.getElementById("chat-status");
  if (!box || !form) return;

  const esc = (s) => (s || "").replace(/[&<>"]/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  function add(m) {
    const d = document.createElement("div");
    d.className = "m";
    d.innerHTML = "<b>" + esc(m.name || "anon") + "</b>: " + esc(m.message);
    box.appendChild(d);
    box.scrollTop = box.scrollHeight;
  }

  if (SUPABASE_URL.indexOf("PASTE") === 0 || !window.supabase) {
    status.textContent = "chat not connected yet — add your Supabase url + anon key in chat.js";
    return;
  }

  const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  async function load() {
    const { data, error } = await sb
      .from("messages")
      .select("*")
      .gte("created_at", "2026-09-08T18:15:00Z")
      .order("created_at", { ascending: true })
      .limit(100);
    if (error) { status.textContent = "load error: " + error.message; return; }
    box.innerHTML = "";
    (data || []).forEach(add);
  }

  // live whispers
  sb.channel("memris-whispers")
    .on("postgres_changes",
      { event: "INSERT", schema: "public", table: "messages" },
      (payload) => add(payload.new))
    .subscribe();

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = (document.getElementById("chat-name").value || "").trim() || "anon";
    const msgEl = document.getElementById("chat-msg");
    const message = (msgEl.value || "").trim();
    if (!message) return;
    msgEl.value = "";
    const { error } = await sb.from("messages").insert({ name, message });
    status.textContent = error ? "send error: " + error.message : "";
  });

  load();
})();
