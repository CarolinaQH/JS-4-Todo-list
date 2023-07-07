// Obtener referencias a los elementos del DOM
const tasks = [];
let id_task = 1;
let input_task = document.getElementById('input_task');
let number_completed_tasks = document.getElementById('number_completed_tasks');


// Agregar tarea a la lista
function addTask() {
    if (!input_task.value) {
        alert("Debes ingresar la tarea");
    } else {
        let object_task = {id: id_task,
        description: input_task.value,
        completed: false,
        }
        input_task.value = "";
        tasks.push(object_task);
        id_task++;
        renderTasks();
    }
}

function renderTasks() {
    let text = `<tr>
            <th class="ps-0">ID</th>
            <th class="ps-3">Tarea</th>
            <th>Listo</th>
            </tr>`;
    tasks.forEach(function(x) {text += `
    <tr id="row_${x.id}"><td class="ps-0">${x.id}</td>
    <td id="description_cell" class="ps-1 pe-3">${x.description}</td>
    <td><input id="checkbox_${x.id}" type="checkbox" class="casillas"></td>
    <td id="symbol_${x.id}" class="ps-1"><button onclick="deleteTask(${x.id})">❌</button></td>
    </tr>
    `})
    table_tasks.innerHTML = text;
    text = "";
    if (!tasks) {
        total_tasks.innerHTML = "0";
    } else {
        total_tasks.innerHTML=tasks.length;
    }
    filterTasks();
}

function filterTasks() {
    const list_completed_tasks = tasks.filter(x=>x.completed == true);
    if (!list_completed_tasks) {
        number_completed_tasks.innerHTML = "0";
    } else {
        number_completed_tasks.innerHTML = list_completed_tasks.length;
    }
    colorCompleted();
}

function colorCompleted() {
    tasks.forEach(function (x) {
      let casilla = document.getElementById('checkbox_' + x.id);
      let casilla_2 = document.getElementById('checkbox2_' + x.id);
      let row = document.getElementById('row_' + x.id);
      let completed = x.completed;
  
      if (casilla.checked) {
        row.style.backgroundColor = "skyblue";
        completed = true;
      } else if (completed && casilla_2.checked) {
        row.style.backgroundColor = "lightgray";
        completed = false;
      } else {
        row.style.backgroundColor = "lightgray";
        casilla.checked = false;
        completed = false;
      }
  
      x.completed = completed;
    });
  
    number_completed_tasks.innerHTML = tasks.filter(x => x.completed).length;
  }
  

 // Agregar un botón de eliminar a la tarea
function deleteTask(id) {
    const index = tasks.findIndex((x) => x.id == id)
    tasks.splice(index, 1);
    renderTasks();
    colorCompleted();
}

