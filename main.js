function loadNotes() {
    let allTasks = JSON.parse(localStorage.getItem("tasks"));
    if (allTasks !== null) {
        const container = document.getElementById("note_container");
        let row = document.createElement("div");
        row.className = "row";
        container.appendChild(row);
        for (let i = 0; i < allTasks.length; i++) {
            if (i % 4 === 0 && i !== 0) {
                row = document.createElement("div");
                row.className = "row";
                container.appendChild(row);
            }
            insertNote(allTasks[i], row);
        }
    }
}

function saveTask() {
    const task_inp = document.getElementById("task");
    const date_inp = document.getElementById("end_date");
    const time_inp = document.getElementById("end_time");

    const new_task = {
        task: task_inp.value,
        date: date_inp.value,
        time: time_inp.value,
    }

    let allTasks = JSON.parse(localStorage.getItem("tasks"));
    if (allTasks === null) {
        allTasks = [];
    }
    allTasks.push(new_task);
    localStorage.setItem("tasks", JSON.stringify(allTasks));
    insertNote(new_task);
}

function insertNote(note, row = null) {
    if (row === null) {
        const container = document.getElementById("note_container");
        row = document.createElement("div");
        row.className = "row";
        container.appendChild(row);
    }
    const d = document.createElement("div");
    const task_div = document.createElement("div");
    task_div.innerHTML = note.task;
    task_div.className = "task";
    d.appendChild(task_div);
    d.className = "col-3 note";
    d.innerHTML += `<br> ${note.date} <br> ${note.time}`;
    row.appendChild(d);
}
