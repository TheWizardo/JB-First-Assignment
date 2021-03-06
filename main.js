function loadNotes() {
    let allTasks = JSON.parse(localStorage.getItem("tasks"));
    const today = new Date();
    if (allTasks !== null) {
        let tasks_yet_passed = allTasks.filter(task => time_diff(today, task.date, task.time) >= 0);
        for (let i = 0; i < tasks_yet_passed.length; i++) {
            tasks_yet_passed[i].id = i;
            insertNote(tasks_yet_passed[i]);
        }
        localStorage.setItem("tasks", JSON.stringify(tasks_yet_passed));
    }
}

function saveTask() {
    const task_inp = document.getElementById("task");
    const date_inp = document.getElementById("end-date");
    const time_inp = document.getElementById("end-time");

    if (isValid(date_inp, time_inp)) {
        let allTasks = JSON.parse(localStorage.getItem("tasks"));
        if (allTasks === null) {
            allTasks = [];
        }
        let index = allTasks.length > 0 ? allTasks[allTasks.length - 1].id + 1 : 0;

        const new_task = {
            id: index,
            task: task_inp.value,
            date: date_inp.value,
            time: time_inp.value,
        }

        insertNote(new_task, true);
        allTasks.push(new_task);
        localStorage.setItem("tasks", JSON.stringify(allTasks));
        task_inp.value = "";
    }
    else {
        alert("Invalid Datetime");
    }
    event.preventDefault();
    date_inp.value = "";
    time_inp.value = "";
}

function insertNote(note, fade = false) {
    const container = document.getElementById("note-container");
    const d = document.createElement("div");
    const close_btn_HTML = `<button class="close close-button" onclick="del_note(${note.id})"><span class="glyphicon glyphicon-remove"></span></button>`
    d.innerHTML += close_btn_HTML;
    const task_div = document.createElement("div");
    task_div.innerText = note.task;
    task_div.className = "task";
    d.appendChild(task_div);
    const date_div = document.createElement("div");
    date_div.innerText = `${note.date}\n${note.time}`;
    date_div.className = "datetime";
    d.appendChild(date_div);
    const week_in_milli = 1000 * 60 * 60 * 24 * 7;
    const today = new Date();
    time_diff(today, note.date, note.time) < week_in_milli ? d.className = "red-note" : d.className = "note";
    if (fade) {
        d.className += " fade-in";
    }
    d.id = `t${note.id}`;
    container.appendChild(d);
}

function del_note(index) {
    let allTasks = JSON.parse(localStorage.getItem("tasks"));
    const container = document.getElementById("note-container");
    const tasks = container.children;

    for (let t = 0; t < tasks.length; t++) {
        if (tasks[t].id === `t${index}`) {
            container.removeChild(tasks[t]);
            allTasks.splice(t, 1);
            localStorage.setItem("tasks", JSON.stringify(allTasks));
            break;
        }
    }
}

function isValid(date_inp, time_inp) {
    const date_validity = Object.keys(date_inp.validity);
    const time_validity = Object.keys(time_inp.validity);
    if (!date_inp.validity.valid || !time_inp.validity.valid) {
        return false;
    }
    const date = date_inp.value;
    const time = time_inp.value;

    const now = time_diff(new Date(), date, time);
    if (now < 0) {
        return false;
    }
    return true;
}

function time_diff(timeObj, dateStr, timeStr) {
    const year = parseInt(dateStr.split("-")[0]);
    const month = parseInt(dateStr.split("-")[1]);
    const day = parseInt(dateStr.split("-")[2]);
    const hour = parseInt(timeStr.split(":")[0]);
    const minute = parseInt(timeStr.split(":")[1]);

    const dueTime = new Date();
    dueTime.setFullYear(year, month - 1, day);
    dueTime.setHours(hour, minute, timeObj.getSeconds(), timeObj.getMilliseconds());
    return (dueTime.getTime() - timeObj.getTime());
}
