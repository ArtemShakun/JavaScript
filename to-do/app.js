(function(){
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
        close.addEventListener('click', handleClose);

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

    function removeToDo(todoId) {
        todos = todos.filter(todo => todo.id !== todoId);
        const todo = toDoList.querySelector(`[data-id="${todoId}"]`);
        todo.querySelector('input').removeEventListener('change', handleToChange);
        todo.querySelector('.close').removeEventListener('click', handleClose);

        todo.remove();
    }

    function alertError(error) {
        alert(error.message);
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

    function handleClose() {
        const todoId = this.parentElement.dataset.id;
        deleteToDo(todoId);
    }

// Async logic
    async function getAllToDos() {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/todos');
            const data = await response.json();
            return data;
        } catch (error) {
            alertError(error);
        }
    }

    async function getAllUsers() {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users');
            const data = await response.json();
            return data;
        } catch (error) {
            alertError(error);
        }
    }

    async function createToDo(todo) {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
                method: 'POST',
                body: JSON.stringify(todo),
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            const newTodo = await response.json();
            printToDo(newTodo);
        } catch (error) {
            alertError(error);
        }
    }

    async function toggleToDoComplete(todoId, completed) {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${todoId}`, {
                method: 'PATCH',
                body: JSON.stringify({completed}),
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            if (!response.ok) {
                throw new Error('Failed to connect with the server! Please try later');
            }
        } catch (error) {
            alertError(error);
        }
    }

    async function deleteToDo(todoId) {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${todoId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            if (response.ok) {
                removeToDo(todoId);
            } else {
                throw new Error('Failed to connect with the server! Please try later.');
            }
        } catch (error) {
            alertError(error);
        }
    }
})();
