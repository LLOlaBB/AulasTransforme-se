const form = document.querySelector("#formCreateTask");
const tbodyTask = document.querySelector("#tbodyTasks");

const KEY_TASKS_LOCAL_STORAGE = "tasks";

var tasks = getTasksLocaStorage();


if (tasks !== null) {
    updateViewTable(tasks);
}
else {
    tasks = [];
}


form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formValue = event.target;
    const { title, description } = formValue;

    tasks.push({
        title: title.value,
        description: description.value
    });
    title.value = "";
    description.value = "";

    updateViewTable(tasks);
    saveTasksLocaStorage();

});
function updateViewTable(List) {
    tbodyTask.innerHTML = "";
    List.forEach((item, index) => {
        const trElement = document.createElement("tr");

        if (item.status) {
            const myClassStatus = getClassByStatus(item.status);
            if (myClassStatus !== "") {
                trElement.classList.add(myClassStatus);
            }
        }

        trElement.innerHTML = `
            <td>${index + 1}</td>
            <td>${item.title}</td>
            <td>${item.description}</td>
            <td>
                <div class="dropdown-center">
                    <img class="dropdown-toggle icon-button" data-bs-toggle="dropdown" src="./assets/icons/more.svg">
                    <ul class="dropdown-menu ">
                        <li><h6 class="dropdown-header">Ações</h6></li>
                        <li><button class="dropdown-item" onclick="deleteTask(${index})">Excluir</button></li>
                        <li><h6 class="dropdown-header">Status</h6></li>
                        <li><button class="btn btn-outline-success btn-status-task" onclick="updateStatusTask(${index}, 'concluida')">Concluída</button></li>
                        <li><button class="btn btn-outline-warning btn-status-task" onclick="updateStatusTask(${index}, 'pendente')">Pendente</button></li>
                        <li><button class="btn btn-outline-danger btn-status-task" onclick="updateStatusTask(${index}, 'cancelada')">Cancelada</button></li>
                    </ul>
                </div>
            </td>
        `;
        tbodyTask.appendChild(trElement);
    });
}
function saveTasksLocaStorage() {
    const listTaskString = JSON.stringify(tasks);
    localStorage.setItem(KEY_TASKS_LOCAL_STORAGE, listTaskString);
}
function getTasksLocaStorage() {
    try {
        const dataString = localStorage.getItem(KEY_TASKS_LOCAL_STORAGE);
        const list = JSON.parse(dataString);
        return list;
        if (dataString === "") {
            throw "sem dados";
        }
    } catch (exception) {
        if (exception !== "sem dados") {
            alert("Não foi possível recuperar sua lista de tarefas");
        }
        return [];
    }
}
function deleteTask(index) {
    tasks.splice(index, 1);
    updateViewTable(tasks);
    saveTasksLocaStorage();
}
function updateStatusTask(index, status) {
    tasks[index].status = status;
    saveTasksLocaStorage();
    updateViewTable(tasks);
}
function getClassByStatus(status) {
    switch (status) {
        case 'concluida':
            return 'table-success';
            break;
        case 'pendente':
            return 'table-warning';
            break;
        case 'cancelada':
            return 'table-danger';
            break;
        default:
            return "";
    }
}