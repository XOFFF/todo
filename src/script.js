window.addEventListener('load', () => {
  todos = JSON.parse(localStorage.getItem('todos')) || [];
  nameInput = document.querySelector('#name');
  const newTodoForm = document.querySelector('.main-header');

  const userName = localStorage.getItem('userName') || '';

  nameInput.value = userName.trim();

  nameInput.addEventListener('change', (e) => {
    localStorage.setItem('userName', e.target.value);
    addTasks();
  });

  newTodoForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const todo = {
      owner: nameInput.value,
      content: e.target.elements.content.value,
      completed: false,
      createdAt: new Date().getTime(),
    };

    todos.push(todo);

    localStorage.setItem('todos', JSON.stringify(todos));

    e.target.reset();

    addTasks();
  });
  addTasks();
});

const userInput = document.querySelector('#user-input');
const addBtn = document.querySelector('#add-task-btn');

function addTasks() {
  const tasksHolder = document.querySelector('.tasks-list');

  tasksHolder.innerHTML = '';

  todos.forEach((todo) => {
    // Show only tasks for the specific onwers name
    if (todo.owner != nameInput.value) return;

    const task = document.createElement('div');
    const checkbox = task.appendChild(document.createElement('input'));
    const text = task.appendChild(document.createElement('input'));
    const editBtn = task.appendChild(document.createElement('button'));
    const deleteBtn = task.appendChild(document.createElement('button'));

    task.className = 'task';

    // Checkbox initialization
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;

    // Text initializattion
    text.className = 'task-content';
    text.type = 'text';
    text.readOnly = true;
    text.value = todo.content;

    // Edit btn initialization
    editBtn.type = 'button';
    editBtn.className = 'btn edit-btn';
    editBtn.innerText = '✏️';
    initEditBtn(editBtn, text, todo);

    // Delete btn initialization
    deleteBtn.type = 'button';
    deleteBtn.className = 'btn delete-btn';
    deleteBtn.innerText = '❌';
    initDeleteBtn(deleteBtn, todo);

    // Final changes to the list
    tasksHolder.style.visibility = 'visible'; // Later on count tasks
    tasksHolder.appendChild(task);

    // Check for completeness
    if (todo.completed) {
      text.classList.toggle('completed');
    }
    // Change completed tasks in localStorage
    checkbox.addEventListener('change', (e) => {
      console.log('CheckBox is', checkbox.checked);
      todo.completed = e.target.checked;
      localStorage.setItem('todos', JSON.stringify(todos));
      // text.classList.toggle('completed');
      if (todo.completed) {
        text.classList.add('completed');
      } else {
        text.classList.remove('completed');
      }

      addTasks();
    });
  });

  userInput.value = '';
}

const initEditBtn = (editBtn, text, todo) => {
  editBtn.onclick = () => {
    text.removeAttribute('readonly');
    text.focus();
    text.addEventListener('blur', (e) => {
      text.setAttribute('readonly', true);
      todo.content = text.value;
      localStorage.setItem('todos', JSON.stringify(todos));
      // addTasks();
    });
  };
};

const initDeleteBtn = (deleteBtn, todo) => {
  deleteBtn.onclick = () => {
    todos = todos.filter((t) => t != todo);
    localStorage.setItem('todos', JSON.stringify(todos));
    deleteBtn.parentNode.remove();
  };
};
