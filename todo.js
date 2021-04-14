// 1) Grab the add form
const formAdd = document.querySelector('.form-add');
// 2) Grab the input add
const inputAdd = document.querySelector('.input-add');
// 3) Grab the span for li text 
const todoContainer = document.querySelector('.todo-container')
// 4) Grab the ul
const todoList = document.querySelector('.todo-list');
// 5) Grab the div container for todo items
const spanText= document.querySelector('.span-text')
// 10) Grab the select for options
const filterTodos = document.querySelector('.filter-todo');
// 13) Grab the search Input
const inputSearch = document.querySelector('.input-search');
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

// 6) Add submit Event to the form add => To add a new li
formAdd.addEventListener('submit', addTodos);

// 8) Add click Event to the ul => To delete a li
todoList.addEventListener('click', deleteToDos);

// 11) Add click Event to the select => To get select options
filterTodos.addEventListener('click', filterOptions)

// 12) Add keyup Event to the input
// inputSearch.addEventListener('keyup', searchTodos);

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%


// 7) addToDos Functionality => To add a new li
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
    inputAdd.value = '';

  }
  
}



// 9) deleteToDos Functionality => To delete a li

function deleteToDos(e) {
  const item = e.target;

  if (item.classList[0] === "trash-btn") {
    // e.target.parentElement.remove();
    const todo = item.parentElement;
    todo.classList.add("delete-animation");
    //at the end
    todo.addEventListener("transitionend", e => {
      todo.remove();
    });
  }
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("line-through");
  }
}











// 12) Create filterTodos Options
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