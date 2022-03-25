// const close_button = document.createElement("button");
// close_button.className = "close close-button";
// close_button.ariaLabel = "Close";
// // close_button.addEventListener("click", function () { del_note(this); });
// // close_button.onclick = function () { del_note(this); };
// const inner_span = document.createElement("span");
// inner_span.ariaHidden = "true";
// inner_span.innerHTML = "&times;";
// close_button.appendChild(inner_span);

function loadNotes() {
    let allTasks = JSON.parse(localStorage.getItem("tasks"));
    let tasks_yet_passed = [];
    const today = new Date();
    if (allTasks !== null) {
        for (let i = 0; i < allTasks.length; i++) {
            if (time_diff(today, allTasks[i].date, allTasks[i].time) >= 0) {
                tasks_yet_passed.push(allTasks[i]);
                insertNote(allTasks[i], i);
            }
        }
        localStorage.setItem("tasks", JSON.stringify(tasks_yet_passed));
    }
}

function saveTask() {
    const task_inp = document.getElementById("task");
    const date_inp = document.getElementById("end-date");
    const time_inp = document.getElementById("end-time");

    if (isValid(date_inp, time_inp)) {

        const new_task = {
            task: task_inp.value,
            date: date_inp.value,
            time: time_inp.value,
        }

        let allTasks = JSON.parse(localStorage.getItem("tasks"));
        if (allTasks === null) {
            allTasks = [];
        }
        insertNote(new_task, allTasks.length, true);
        allTasks.push(new_task);
        localStorage.setItem("tasks", JSON.stringify(allTasks));
    }
    else {
        alert("Invalid Datetime");
    }
    event.preventDefault();
    task_inp.value = "";
    date_inp.value = "";
    time_inp.value = "";
}

function insertNote(note, index, fade) {
    const container = document.getElementById("note-container");
    const d = document.createElement("div");
    // d.appendChild(close_button);
    const close_btn_HTML = `<button class="close close-button" onclick="del_note(${index})"><span class="glyphicon glyphicon-remove"></span></button>`
    d.innerHTML += close_btn_HTML;
    const task_div = document.createElement("div");
    task_div.innerText = note.task;
    task_div.className = "task";
    d.appendChild(task_div);
    const week_in_milli = 1000 * 60 * 60 * 24 * 7;
    const today = new Date();
    time_diff(today, note.date, note.time) < week_in_milli ? d.className = "red-note" : d.className = "note";
    if (fade) {
        d.className += " fade-in";
    }
    d.innerHTML += `<br> ${note.date} <br> ${note.time}`;
    d.id = `t${index}`;
    container.appendChild(d);
}

function del_note(index) {
    const container = document.getElementById("note-container");
    const tasks = container.children;

    for (let t of tasks) {
        if (t.id === `t${index}`){
            container.removeChild(t);
            break;
        }
    }
    let allTasks = JSON.parse(localStorage.getItem("tasks"));
    allTasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(allTasks));
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
