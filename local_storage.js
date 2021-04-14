const formAdd = document.querySelector('.form-add');
const inputAdd = document.querySelector('.input-add');
const todoContainer = document.querySelector('.todo-container')
const todoList = document.querySelector('.todo-list');
const spanText= document.querySelector('.span-text')
const filterTodos = document.querySelector('.filter-todo');
const inputSearch = document.querySelector('.input-search');

// Events
document.addEventListener("DOMContentLoaded", getTodos);
formAdd.addEventListener('submit', addTodos);
todoList.addEventListener('click', deleteToDos);
filterTodos.addEventListener('click', filterOptions)


// Functionalites

function addTodos(e) {
  e.preventDefault();

  if(inputAdd.value === '') {
    alert('Please add a new todo')
  } else {
    const newLi = document.createElement('li');
    newLi.classList.add('todo-item')
    todoList.append(newLi)

    const newSpan = document.createElement('span');
    newSpan.innerText = inputAdd.value;

    newSpan.classList.add('span-text')
    newLi.append(newSpan);

    saveLocalTodos(inputAdd.value);

    inputAdd.value = '';


    const newCompleteBtn = document.createElement('button');
    newCompleteBtn.innerHTML = `<i class="fas fa-check"></i>`;
    newCompleteBtn.classList.add('complete-btn')
    newLi.append(newCompleteBtn);

    const trashBtn = document.createElement("button");
    trashBtn.innerHTML = `<i class="fas fa-trash"></i>`;
    trashBtn.classList.add('trash-btn')
    newLi.appendChild(trashBtn);
    //attach final Todo
    todoList.appendChild(newLi);
    todoContainer.appendChild(todoList);


  }
  
}

function deleteToDos(e) {
  const item = e.target;

  if (item.classList[0] === "trash-btn") {
    // e.target.parentElement.remove();
    const todo = item.parentElement;
    todo.classList.add("delete-animation");

    removeLocalTodos(todo);

    //at the end
    todo.addEventListener("transitionend", e => {
      todo.remove();
    });
  }
  if(item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("line-through");
  }
}

function filterOptions(e) {
  let options = e.target.value;
  // Grab the all li inside the ul  (childNodes or children)
  const todos = Array.from(todoList.children);
  todos.forEach((todo) => {
    switch(options) {
      case 'all':
        todo.style.display = 'flex';
        break;
      case 'completed':
        if(todo.classList.contains('line-through')) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none';
        }
        break;
      case 'uncompleted':
        if(!todo.classList.contains('line-through')) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none';
        }
    }
  });
}

// Input search Functionality
inputSearch.addEventListener('keyup', (e) => {
  const term = e.target.value.toLowerCase();
  const todos = Array.from(todoList.querySelectorAll('.todo-item'));
  todos.forEach((todo) => {
    const todoText = todo.firstElementChild.textContent;
    if(todoText.toLowerCase().indexOf(term) != -1) {
      todo.style.display = 'flex';
    } else {
      todo.style.display = 'none';
    }
  })

})


// LS

// Save Todos
function saveLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

// remove Todos
function removeLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}


// Get Todos
function getTodos() {
  let todos;
  if(localStorage.getItem('todos') === null) {
      todos = [];
  } else {
      todos = JSON.parse(localStorage.getItem('todos'));
  }

  todos.forEach((todo) => {
    const newLi = document.createElement('li');
    newLi.classList.add('todo-item')
    todoList.append(newLi)

    const newSpan = document.createElement('span');
    newSpan.innerText = todo;
    newSpan.classList.add('span-text')
    newLi.append(newSpan);
    inputAdd.value = '';


    const newCompleteBtn = document.createElement('button');
    newCompleteBtn.innerHTML = `<i class="fas fa-check"></i>`;
    newCompleteBtn.classList.add('complete-btn')
    newLi.append(newCompleteBtn);

    const trashBtn = document.createElement("button");
    trashBtn.innerHTML = `<i class="fas fa-trash"></i>`;
    trashBtn.classList.add('trash-btn')
    newLi.appendChild(trashBtn);
    //attach final Todo
    todoList.appendChild(newLi);
    todoContainer.appendChild(todoList);

  });

}
