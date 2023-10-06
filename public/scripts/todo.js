const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const todoLane = document.getElementById("todo-lane");

form.addEventListener("submit", (e) => {
    const value = input.value;

    if (!value) {
        alert('Title is required to create task')
        e.preventDefault();
        return;
    }

    // const newTask = document.createElement("p");
    // newTask.classList.add("task");
    // newTask.setAttribute("draggable", "true");
    // newTask.innerText = value;

    // newTask.addEventListener("dragstart", () => {
    //     newTask.classList.add("is-dragging");
    // });

    // newTask.addEventListener("dragend", () => {
    //     newTask.classList.remove("is-dragging");
    // });

    // todoLane.appendChild(newTask);
    // input.value = "";

});
// delete-icon

let elements = document.getElementsByClassName("delete-icon");

let deleteTask = async (e) => {
    let attribute = e.target.getAttribute("data-taskid");
    let result = confirm("Are you sure you want to delete task?");
    if (result) {
        let url = `/delete/${attribute}`;
        let response = await fetch(url, {
            method: "DELETE", // *GET, POST, PUT, DELETE, etc.
        });
        // location.reload(); //refresh the page
        e.target.parentNode.remove()
        displayNoTasksMessage();
    }
};

for (let i = 0; i < elements.length; i++) {
    elements[i].addEventListener('click', deleteTask, false);
}
