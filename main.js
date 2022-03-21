function loadNotes() {
    let allTasks = JSON.parse(localStorage.getItem("tasks"));
    if (allTasks !== null) {
        for (let t of allTasks) {
            insertNote(t);
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
    if (allTasks === null){
        allTasks = [];
    }
    allTasks.push(new_task);
    localStorage.setItem("tasks", JSON.stringify(allTasks));
    insertNote(new_task);
}

function insertNote(note) {
}
