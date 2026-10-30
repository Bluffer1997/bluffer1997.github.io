const $ = (id) => document.getElementById(id);
const STORAGE_KEY = "private-tracker-records";
let records = loadRecords();

function loadRecords() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  render();
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, ch => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  })[ch]);
}

function dateTime(timestamp) {
  return new Date(timestamp).toLocaleString([], {
    year: "numeric", month: "short", day: "numeric",
    hour: "numeric", minute: "2-digit"
  });
}

$("entryForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const rawUrl = $("url").value.trim();
  let parsed;
  try {
    parsed = new URL(rawUrl);
    if (!["http:", "https:"].includes(parsed.protocol)) throw new Error("Invalid protocol");
  } catch {
    alert("Please enter a valid website URL starting with http:// or https://");
    return;
  }

  records.unshift({
    id: (crypto.randomUUID ? crypto.randomUUID() : String(Date.now()) + Math.random()),
    url: parsed.href,
    title: $("title").value.trim(),
    enteredAt: Date.now(),
    watchedAt: null
  });
  $("entryForm").reset();
  save();
});

$("filter").addEventListener("change", render);

function render() {
  const filter = $("filter").value;
  const filtered = records.filter(record =>
    filter === "all" ||
    (filter === "watched" && record.watchedAt) ||
    (filter === "unwatched" && !record.watchedAt)
  );

  $("totalCount").textContent = records.length;
  $("watchedCount").textContent = records.filter(r => r.watchedAt).length;
  $("unwatchedCount").textContent = records.filter(r => !r.watchedAt).length;
  $("empty").style.display = filtered.length ? "none" : "block";
  $("empty").textContent = records.length ? "No links match this filter." : "Nothing saved yet. Add your first link above.";
  $("entries").innerHTML = "";

  filtered.forEach(record => {
    const item = document.createElement("article");
    item.className = "entry";
    const title = record.title || new URL(record.url).hostname;
    const status = record.watchedAt
      ? `<span class="status done">MARKED WATCHED</span>`
      : `<span class="status pending">NOT WATCHED YET</span>`;
    const watchedInfo = record.watchedAt
      ? `<br>Marked watched: ${escapeHTML(dateTime(record.watchedAt))}` : "";

    item.innerHTML = `
      <div class="entry-main">
        <div class="entry-title">${escapeHTML(title)}</div>
        <a class="entry-url" href="${escapeHTML(record.url)}" target="_blank" rel="noopener noreferrer">${escapeHTML(record.url)}</a>
        <div class="entry-meta">Added: ${escapeHTML(dateTime(record.enteredAt))}${watchedInfo}</div>
        ${status}
      </div>
      <div class="entry-actions">
        ${record.watchedAt
          ? `<button class="small-btn mark" data-action="undo" data-id="${escapeHTML(record.id)}">Undo watched</button>`
          : `<button class="small-btn mark" data-action="watched" data-id="${escapeHTML(record.id)}">Mark as watched</button>`}
        <button class="small-btn delete" data-action="delete" data-id="${escapeHTML(record.id)}">Delete</button>
      </div>`;
    $("entries").appendChild(item);
  });
}

$("entries").addEventListener("click", (event) => {
  const button = event.target.closest("button[data-action]");
  if (!button) return;
  const record = records.find(item => item.id === button.dataset.id);
  if (!record) return;

  if (button.dataset.action === "watched") record.watchedAt = Date.now();
  if (button.dataset.action === "undo") record.watchedAt = null;
  if (button.dataset.action === "delete") {
    if (!confirm("Delete this saved link and its timestamps?")) return;
    records = records.filter(item => item.id !== record.id);
  }
  save();
});

render();
