// Globals
let todos = [];
let users = [];

// Attach event
document.addEventListener('DOMContentLoaded', initApp);

// Event logic
function initApp() {
    Promise.all([getAllToDos(), getAllUsers()]).then(value => {
        [todos, users] = value;
    })
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