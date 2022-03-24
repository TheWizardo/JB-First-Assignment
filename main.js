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
    if (allTasks !== null) {
        const container = document.getElementById("note-container");
        let row = document.createElement("div");
        row.className = "row";
        container.appendChild(row);
        for (let i = 0; i < allTasks.length; i++) {
            // TODO
            // check datetime and del accordingly

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
    const date_inp = document.getElementById("end-date");
    const time_inp = document.getElementById("end-time");

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
        const container = document.getElementById("note-container");
        const rows = container.childNodes;
        row = rows[rows.length - 1];
        if (row.length >= 4) {
            row = document.createElement("div");
            row.className = "row";
            container.appendChild(row);
        }
    }
    const d = document.createElement("div");
    // d.appendChild(close_button);
    d.innerHTML += close_btn_HTML;
    const task_div = document.createElement("div");
    task_div.innerHTML = note.task;
    task_div.className = "task";
    d.appendChild(task_div);
    d.className = "col-3 note";
    d.innerHTML += `<br> ${note.date} <br> ${note.time}`;
    row.appendChild(d);
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
