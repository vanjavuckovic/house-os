const PIN = "1991";

let rooms = ["Living Room","Bedroom","Study","Kitchen","Bathroom","Future Room"];

function unlock(){
  if(document.getElementById("pin").value === PIN){
    document.getElementById("lock").style.display="none";
    init();
  } else {
    document.getElementById("err").innerText="Wrong PIN";
  }
}

function reset(){
  localStorage.clear();
  location.reload();
}

function tab(id){
  document.querySelectorAll(".page").forEach(p=>p.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
}

/* STORAGE */
function get(k){ return JSON.parse(localStorage.getItem(k)||"[]"); }
function set(k,v){ localStorage.setItem(k,JSON.stringify(v)); }

/* TASKS */
function addTask(){
  let t=get("tasks");
  t.push(document.getElementById("taskInput").value);
  set("tasks",t);
  renderTasks();
}

function renderTasks(){
  document.getElementById("taskList").innerHTML=
    get("tasks").map(t=>`<div class="card">${t}</div>`).join("");
}

/* ROOMS */
function initRooms(){
  let sel=document.getElementById("roomSelect");
  sel.innerHTML="";
  rooms.forEach(r=>{
    let opt=document.createElement("option");
    opt.value=r;
    opt.innerText=r;
    sel.appendChild(opt);
  });
}

function addRoomTask(){
  let r=get("roomTasks");
  r.push({
    room:document.getElementById("roomSelect").value,
    task:document.getElementById("roomTask").value
  });
  set("roomTasks",r);
  renderRooms();
}

function renderRooms(){
  document.getElementById("roomData").innerHTML=
    get("roomTasks").map(x=>
      `<div class="card"><b>${x.room}</b>: ${x.task}</div>`
    ).join("");
}

/* BUDGET */
function addBudget(){
  let b=get("budget");
  b.push({
    name:document.getElementById("bName").value,
    cost:Number(document.getElementById("bCost").value)
  });
  set("budget",b);
  renderBudget();
}

function renderBudget(){
  let b=get("budget");
  let total=b.reduce((a,x)=>a+x.cost,0);

  document.getElementById("budgetList").innerHTML=
    b.map(x=>`<div class="card">${x.name} - €${x.cost}</div>`).join("");

  document.getElementById("total").innerText="Total: €"+total;
}

/* DASHBOARD */
function renderDash(){
  document.getElementById("summary").innerHTML=`
    <div class="card">Tasks: ${get("tasks").length}</div>
    <div class="card">Budget items: ${get("budget").length}</div>
    <div class="card">Room tasks: ${get("roomTasks").length}</div>
  `;
}

/* INIT */
function init(){
  initRooms();
  renderTasks();
  renderRooms();
  renderBudget();
  renderDash();
}
