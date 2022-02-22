// Globals
let todos = [];
let users = [];
const toDoList = document.getElementById('todo-list');
const userSelect = document.getElementById('user-todo');
const form = document.querySelector('form');

// Attach event
document.addEventListener('DOMContentLoaded', initApp);
form.addEventListener('submit', handleSubmit);

// Basic logic
function getUserName(userId) {
    const user = users.find(u => u.id === userId);
    return user.name;
}

function printToDo({id, userId, title, completed}) {
    const li = document.createElement('li');
    li.className = 'todo-item';
    li.dataset.id = id;
    li.innerHTML = `<span>${title} <i>by </i> <b>${getUserName(userId)}</b></span>`;

    const status = document.createElement('input');
    status.type = 'checkbox';
    status.checked = completed;
    status.addEventListener('change', handleToChange);

    const close = document.createElement('span');
    close.innerHTML = '&times;';
    close.className = 'close';

    li.append(close);
    li.prepend(status);

    toDoList.prepend(li);
}

function createUserOption(user) {
    const option = document.createElement('option');
    option.value = user.id;
    option.innerText = user.name;

    userSelect.append(option);
}

// Event logic
function initApp() {
    Promise.all([getAllToDos(), getAllUsers()]).then(values => {
        [todos, users] = values;
        todos.forEach(todo => printToDo(todo));
        users.forEach((user) => createUserOption(user));
    });
}

function handleSubmit(e) {
    e.preventDefault();
    
    createToDo({
        userId: Number(form.user.value),
        title: form.todo.value,
        completed: false,
    });
}

function handleToChange() {
    const dataId = this.parentElement.dataset.id;
    const completed = this.checked;
    toggleToDoComplete(dataId, completed);
}

// Async logic
async function getAllToDos() {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos');
    const data = await response.json();
    return data;
}

async function getAllUsers() {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await response.json();
    return data;
}

async function createToDo(todo) {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
        method: 'POST',
        body: JSON.stringify(todo),
        headers: {
            'Content-Type': 'application/json'
        },
    });
    const newTodo = await response.json();
    printToDo(newTodo)
}

async function toggleToDoComplete(todoId, completed) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${todoId}`, {
        method: 'PATCH',
        body: JSON.stringify({completed}),
        headers: {
            'Content-Type': 'application/json'
        },
    })
    const data = await response.json();
    if (!response.ok) {
        // Error
    }
}