const $ = (id) => document.getElementById(id);

let running = false;
let startedAt = null;
let elapsedBeforePause = 0;
let ticker = null;
let events = JSON.parse(localStorage.getItem("lineoclock-events") || "[]");

function formatDuration(ms) {
  const total = Math.floor(ms / 1000);
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  return [h, m, s].map(n => String(n).padStart(2, "0")).join(":");
}

function elapsedNow() {
  return elapsedBeforePause + (running ? Date.now() - startedAt : 0);
}

function updateTimer() {
  $("timer").textContent = formatDuration(elapsedNow());
}

function setRunning(value) {
  running = value;
  $("startBtn").disabled = running;
  $("pauseBtn").disabled = !running;
  $("lineBtn").disabled = !running;
  $("timerStatus").textContent = running ? "Timer is running." : (startedAt ? "Timer paused." : "Timer is not running.");
}

$("startBtn").addEventListener("click", () => {
  if (startedAt === null) startedAt = Date.now();
  else startedAt = Date.now();
  setRunning(true);
  ticker = setInterval(updateTimer, 250);
  updateTimer();
});

$("pauseBtn").addEventListener("click", () => {
  if (!running) return;
  elapsedBeforePause += Date.now() - startedAt;
  startedAt = null;
  running = false;
  clearInterval(ticker);
  setRunning(false);
  updateTimer();
});

$("resetBtn").addEventListener("click", () => {
  clearInterval(ticker);
  running = false;
  startedAt = null;
  elapsedBeforePause = 0;
  setRunning(false);
  updateTimer();
});

$("lineBtn").addEventListener("click", () => {
  if (!running) return;
  const now = Date.now();
  const previous = events.length ? events[events.length - 1] : null;
  const event = {
    timestamp: now,
    elapsed: elapsedNow(),
    size: $("size").value,
    completion: $("completion").value,
    notes: $("notes").value.trim(),
    interval: previous ? now - previous.timestamp : null
  };
  events.push(event);
  localStorage.setItem("lineoclock-events", JSON.stringify(events));
  $("size").value = "";
  $("completion").value = "";
  $("notes").value = "";
  renderHistory();
});

function renderHistory() {
  $("count").textContent = events.length;
  const last = events[events.length - 1];
  if (last && last.interval !== null) {
    $("interval").textContent = formatDuration(last.interval);
    $("intervalHint").textContent = "Since the previous logged event";
  } else {
    $("interval").textContent = "—";
    $("intervalHint").textContent = "Appears after the second event";
  }

  $("emptyState").style.display = events.length ? "none" : "block";
  $("history").innerHTML = "";
  [...events].reverse().forEach((event, reverseIndex) => {
    const number = events.length - reverseIndex;
    const li = document.createElement("li");
    const details = [
      event.size ? `Size: ${event.size}` : "",
      event.completion ? `All went down: ${event.completion}` : "",
      event.interval !== null ? `Time since previous: ${formatDuration(event.interval)}` : "First event"
    ].filter(Boolean).join(" · ");
    li.innerHTML = `
      <span class="event-number">${number}</span>
      <div>
        <div class="event-title">Doing a line</div>
        <div class="event-meta">${escapeHTML(details)}${event.notes ? `<br>${escapeHTML(event.notes)}` : ""}</div>
      </div>
      <time class="event-time">${new Date(event.timestamp).toLocaleTimeString([], {hour: "2-digit", minute: "2-digit", second: "2-digit"})}</time>
    `;
    $("history").appendChild(li);
  });
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  })[char]);
}

$("clearBtn").addEventListener("click", () => {
  if (!events.length || !confirm("Clear all events saved for this session?")) return;
  events = [];
  localStorage.removeItem("lineoclock-events");
  renderHistory();
});

setRunning(false);
updateTimer();
renderHistory();
