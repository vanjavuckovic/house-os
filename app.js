const PIN = "1991";

function checkPIN() {
  const input = document.getElementById("pinInput").value;
  if (input === PIN) {
    localStorage.setItem("unlocked", "true");
    document.getElementById("lockscreen").style.display = "none";
    document.getElementById("app").classList.remove("hidden");
    loadAll();
  } else {
    document.getElementById("error").innerText = "Wrong PIN";
  }
}

function logout() {
  localStorage.removeItem("unlocked");
  location.reload();
}

function showTab(tab) {
  document.querySelectorAll(".tab").forEach(t => t.classList.add("hidden"));
  document.getElementById(tab).classList.remove("hidden");
}

/* STORAGE HELPERS */
function get(key) {
  return JSON.parse(localStorage.getItem(key) || "[]");
}

function set(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

/* TASKS */
function addTask() {
  const tasks = get("tasks");
  tasks.push(document.getElementById("taskInput").value);
  set("tasks", tasks);
  loadTasks();
}

function loadTasks() {
  document.getElementById("taskList").innerHTML =
    get("tasks").map(t => `<div class="card">${t}</div>`).join("");
}

/* BUDGET */
function addBudget() {
  const items = get("budget");
  items.push({
    item: document.getElementById("budgetItem").value,
    amount: document.getElementById("budgetAmount").value
  });
  set("budget", items);
  loadBudget();
}

function loadBudget() {
  document.getElementById("budgetList").innerHTML =
    get("budget").map(b => `<div class="card">${b.item} - €${b.amount}</div>`).join("");
}

/* VVE */
function addVVE() {
  const v = get("vve");
  v.push(document.getElementById("vveInput").value);
  set("vve", v);
  loadVVE();
}

function loadVVE() {
  document.getElementById("vveList").innerHTML =
    get("vve").map(v => `<div class="card">${v}</div>`).join("");
}

/* QUOTES */
function addQuote() {
  const q = get("quotes");
  q.push(document.getElementById("quoteInput").value);
  set("quotes", q);
  loadQuotes();
}

function loadQuotes() {
  document.getElementById("quoteList").innerHTML =
    get("quotes").map(q => `<div class="card">${q}</div>`).join("");
}

/* NOTES */
function saveNotes() {
  localStorage.setItem("notes", document.getElementById("notesArea").value);
}

/* DASHBOARD */
function loadStats() {
  document.getElementById("stats").innerHTML = `
    <div class="card">Tasks: ${get("tasks").length}</div>
    <div class="card">Budget items: ${get("budget").length}</div>
    <div class="card">VvE docs: ${get("vve").length}</div>
    <div class="card">Quotes: ${get("quotes").length}</div>
  `;
}

/* LOAD EVERYTHING */
function loadAll() {
  loadTasks();
  loadBudget();
  loadVVE();
  loadQuotes();
  loadStats();
  document.getElementById("notesArea").value = localStorage.getItem("notes") || "";
}

/* AUTO-UNLOCK */
if (localStorage.getItem("unlocked") === "true") {
  document.getElementById("lockscreen").style.display = "none";
  document.getElementById("app").classList.remove("hidden");
  setTimeout(loadAll, 100);
}
