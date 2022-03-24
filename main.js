// const close_button = document.createElement("button");
// close_button.className = "close close-button";
// close_button.ariaLabel = "Close";
// // close_button.addEventListener("click", function () { del_note(this); });
// // close_button.onclick = function () { del_note(this); };
// const inner_span = document.createElement("span");
// inner_span.ariaHidden = "true";
// inner_span.innerHTML = "&times;";
// close_button.appendChild(inner_span);

const close_btn_HTML = `<button class="close close-button" aria-lable="Close" onclick="del_note(this)"><span aria-hidden="true">&times;</span></button>`

function loadNotes() {
    let allTasks = JSON.parse(localStorage.getItem("tasks"));
    let tasks_yet_passed = [];
    const today = new Date();
    if (allTasks !== null) {
        for (let t of allTasks) {
            if (time_diff(today, t.date, t.time) >= 0) {
                tasks_yet_passed.push(t);
                insertNote(t);
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
        allTasks.push(new_task);
        localStorage.setItem("tasks", JSON.stringify(allTasks));
        insertNote(new_task, true);
    }
    else {
        alert("Invalid Datetime");
    }
    event.preventDefault();
    task_inp.value = "";
    date_inp.value = "";
    time_inp.value = "";
}

function insertNote(note, isNew = false) {
    const container = document.getElementById("note-container");
    const d = document.createElement("div");
    // d.appendChild(close_button);
    d.innerHTML += close_btn_HTML;
    const task_div = document.createElement("div");
    task_div.innerText = note.task;
    task_div.className = "task";
    d.appendChild(task_div);
    // const week_in_milli = 1000 * 60 * 60 * 24 * 7;
    // const today = new Date();
    isNew ? d.className = "note fade-in" : d.className = "note";
    d.innerHTML += `<br> ${note.date} <br> ${note.time}`;
    container.appendChild(d);
}

function del_note(btn) {
    const note = btn.parentElement;
    const task_div = btn.nextSibling;
    const lines = note.innerText.split('\n');
    const task_date = lines[lines.length - 2];
    const task_time = lines[lines.length - 1];
    let allTasks = JSON.parse(localStorage.getItem("tasks"));
    for (let i = 0; i < allTasks.length; i++) {
        // innerText ignores multipul spaces. innerHTML doesn't.
        if (allTasks[i].task == task_div.innerHTML && allTasks[i].date === task_date && allTasks[i].time === task_time) {
            allTasks.splice(i, 1);
            localStorage.setItem("tasks", JSON.stringify(allTasks));
            break;
        }
    }
    location.reload();
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
