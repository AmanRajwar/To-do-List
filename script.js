let tasks = [];
const tasksList = document.getElementById('list');
const addTaskInput = document.getElementById('add');

// Get the current date
var currentDate = new Date();

// Get the day, month, and year
var day = currentDate.toLocaleString('default', { weekday: 'long' });
var date = currentDate.getDate();
var month = currentDate.toLocaleString('default', { month: 'short' });
var year = currentDate.getFullYear();
if (date < 10) {
    date = '0' + date;
}
document.getElementById('date-month').innerHTML = `<h1>${date} ${month}</h1>`;

document.getElementById('day').innerHTML = `<h1>${day}</h1>`;
document.getElementById('year').innerHTML = `<h1>${year}</h1>`;


function addToDom(task) {
    const li = document.createElement('li');

    li.innerHTML = `
    <input type="checkbox" id="${task.id}" ${task.complete ? 'checked' : ''} class="custom-checkbox">
    <label for="${task.id}">${task.text}</label>
    <i class="fa-solid fa-trash delete" data-id="${task.id}"></i>
    `;

    tasksList.append(li);

}

function renderList(tasksToRender) {
    tasksList.innerHTML = '';
    for (let i = 0; i < tasks.length; i++) {
        addToDom(tasksToRender[i]);
    }

}

function toggleTask(taskId) {
    const task = tasks.filter(task => {
        return task.id === taskId;
    })
    if (task.length > 0) {
        const currentTask = task[0]
        currentTask.complete = !currentTask.complete;
        renderList(tasks);
        // console.log("toogled")
    }
}

function deleteTask(taskId) {
    const updateTask = tasks.filter(task => {
        return task.id !== taskId;
    })
    tasks = updateTask;
    renderList(tasks);

    showNotification('Task deleted successfully')
}

function addTask(task) {
    if (task) {
        tasks.push(task);
        renderList(tasks);
        showNotification('Task Added Successfully');
    }
}

function showNotification(text) {
    alert(text);
}

function completeAll() {
    console.log("completeAll");
    for (let i = 0; i < tasks.length; i++) {
        tasks[i].complete = true;
    }
    renderList(tasks);

}

function completedTasks() {
    const updatedTask = tasks.filter(task => {
        return task.complete === true;
    })
    renderList(updatedTask)
}

function remainingTasks() {
    const updatedTask = tasks.filter(task => {
        return task.complete !== true;
    })
    renderList(updatedTask)
}

function handleKeypress(event) {
    if (event.key == 'Enter') {
        const text = event.target.value;
        if (!text) {
            showNotification('Task can not be Empty');
            return;
        }

        const task = {
            text,
            id: Date.now().toString(),
            complete: false
        }
        event.target.value = '';
        addTask(task);
    }
}


function handleClick(event) {
    const target = event.target;
    console.log(target);
    if (target.className == 'fa-solid fa-trash delete') {
        // console.log("delete");
        const taskId = target.dataset.id;
        deleteTask(taskId);
    } else if (target.className == 'custom-checkbox') {
        const taskId = target.id;
        toggleTask(taskId);
    }
    if (target.className == 'addClick') {
        // console.log("addclick")
        const taskId = target.id;
        if (taskId === "completed") {
            completedTasks();
        } else if (taskId === "remaining") {
            remainingTasks();
        } else if (taskId === "completeAll") {
            completeAll();
        }
        else if (taskId === "allTasks") {
            renderList(tasks);
        }
    }
}

addTaskInput.addEventListener('keyup', handleKeypress);
document.addEventListener('click', handleClick);