const rooms = ["Living Room","Bedroom","Kitchen","Bathroom","Study","Future Room"];

function getTasks(){
  return JSON.parse(localStorage.getItem("tasks") || "[]");
}

function saveTasks(t){
  localStorage.setItem("tasks", JSON.stringify(t));
}

function init(){
  const sel = document.getElementById("room");

  rooms.forEach(r=>{
    const opt = document.createElement("option");
    opt.value = r;
    opt.innerText = r;
    sel.appendChild(opt);
  });

  render();
}

function addTask(){
  const tasks = getTasks();

  tasks.push({
    text: document.getElementById("newTask").value,
    room: document.getElementById("room").value,
    done: false
  });

  saveTasks(tasks);
  document.getElementById("newTask").value = "";
  render();
}

function toggle(i){
  const tasks = getTasks();
  tasks[i].done = !tasks[i].done;
  saveTasks(tasks);
  render();
}

function removeTask(i){
  const tasks = getTasks();
  tasks.splice(i,1);
  saveTasks(tasks);
  render();
}

function render(){
  const board = document.getElementById("board");
  const tasks = getTasks();

  board.innerHTML = "";

  rooms.forEach(room=>{
    const col = document.createElement("div");
    col.className = "column";

    const filtered = tasks.filter(t => t.room === room);

    col.innerHTML = `
      <h3>${room}</h3>
      ${filtered.map((t,i)=>`
        <div class="card ${t.done ? "done" : ""}">
          <input type="checkbox" ${t.done ? "checked" : ""} onclick="toggle(${tasks.indexOf(t)})">
          ${t.text}
          <button onclick="removeTask(${tasks.indexOf(t)})">❌</button>
        </div>
      `).join("")}
    `;

    board.appendChild(col);
  });
}

init();
