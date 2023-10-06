const draggables = document.querySelectorAll(".task");
const droppables = document.querySelectorAll(".swim-lane");

const updateTaskStatus = async (task) => {
    let taskStatus = task.closest('.swim-lane').dataset.status;
    let taskId = task.dataset.taskid;
    url = `/updateStatus/${taskId}/${taskStatus}`;

    const response = await fetch(url, {
        method: "PUT", // *GET, POST, PUT, DELETE, etc.
    });
    console.log(response);
}

const displayNoTasksMessage = () => {
    let todo_count = document.querySelectorAll("#todo-lane .task").length;
    let doing_count = document.querySelectorAll("#doing-lane .task").length;
    let done_count = document.querySelectorAll("#done-lane .task").length;
    let message = 'There are no tasks here.';

    document.querySelector("#todo-lane .no-tasks").innerText = (todo_count === 0) ? message : "";
    document.querySelector("#doing-lane .no-tasks").innerText = (doing_count === 0) ? message : "";
    document.querySelector("#done-lane .no-tasks").innerText = (done_count === 0) ? message : "";
}

draggables.forEach((task) => {
    task.addEventListener("dragstart", () => {
        task.classList.add("is-dragging");
    })
    task.addEventListener("dragend", () => {
        task.classList.remove("is-dragging");
        updateTaskStatus(task);
        displayNoTasksMessage()
    })
});

droppables.forEach((zone) => {
    zone.addEventListener("dragover", (e) => {
        e.preventDefault();

        const bottomTask = insertAboveTask(zone, e.clientY);
        const curTask = document.querySelector(".is-dragging");
        if (!bottomTask) { /*-shuffling tasks-*/
            zone.appendChild(curTask);
        } else {
            zone.insertBefore(curTask, bottomTask);
        }

    })
})

const insertAboveTask = (zone, mouseY) => {
    const els = zone.querySelectorAll(".task:not(.is-dragging)");

    let closestTask = null;
    let closestOffset = Number.NEGATIVE_INFINITY;

    els.forEach((task) => {
        const { top } = task.getBoundingClientRect();

        const offset = mouseY - top;

        if (offset < 0 && offset > closestOffset) {
            closestOffset = offset;
            closestTask = task;
        }
    });

    return closestTask;

};
