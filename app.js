const form = document.querySelector(".title");
const inputText = document.querySelector(".inputText");
const contentHold = document.querySelector(".contentHold");
const clearButton = document.querySelector(".clearButton");

let todos = [];

const executeEvents = () => {
  form.addEventListener("submit", addTodo);
  document.addEventListener("DOMContentLoaded", pageLoaded);
  clearButton.addEventListener("click", allTodosClear);
};

const removeTodo = (e) => {
  const todo = e.target.parentElement.parentElement;
  const text = todo.firstChild.children[1].textContent;

  todo.remove();

  removeTodoStorage(text);

  showAlert("Success", "deleted todo");
};

const removeTodoStorage = (removeTodo) => {
  checkTodoFromStorage();
  todos.forEach((td, index) => {
    if (removeTodo === td.text) {
      todos.splice(index, 1);
    }
  });
  localStorage.setItem("todos", JSON.stringify(todos));
};
const allTodosClear = () => {
  const todoList = document.querySelectorAll(".contents");
  if (todoList.length > 0) {
    todoList.forEach((todo) => {
      todo.remove();
    });
  }
  todos = [];
  localStorage.setItem("todos", JSON.stringify(todos));
};

const pageLoaded = () => {
  checkTodoFromStorage();
  todos.forEach((todo) => {
    addTodoToUI(todo);
  });
};

const addTodo = (e) => {
  e.preventDefault();

  const inputVal = inputText.value;

  const todo = {
    text: inputVal,
    isCompleted: false,
  };

  if (inputVal === "" || inputVal === null) {
    showAlert("Warning", "please enter a todo");
  } else {
    addTodoToUI(todo);
    addTodoToStorage(todo);
    showAlert("Success", "successfully added todo");
  }
};

const addTodoToUI = (newTodo) => {
  const contents = document.createElement("div");
  contents.classList.add("contents");
  contentHold.appendChild(contents);

  const contentLeft = document.createElement("div");
  contentLeft.classList.add("contentLeft");
  contents.appendChild(contentLeft);

  const checkbox = document.createElement("input");
  checkbox.classList.add("checkbox");
  checkbox.type = "checkbox";
  checkbox.checked = newTodo.isCompleted;
  contentLeft.appendChild(checkbox);

  const todoText = document.createElement("span");
  todoText.classList.add("todo");
  todoText.textContent = newTodo.text;
  contentLeft.appendChild(todoText);

  const editInput = document.createElement("input");
  editInput.classList.add("editInput");
  contentLeft.appendChild(editInput);

  const contentRight = document.createElement("div");
  contentRight.classList.add("contentRight");
  contents.appendChild(contentRight);

  const editButton = document.createElement("button");
  editButton.classList.add("editButton");
  editButton.textContent = "...";
  contentRight.appendChild(editButton);

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("deleteButton");
  deleteButton.textContent = "X";
  contentRight.appendChild(deleteButton);

  const saveButton = document.createElement("button");
  saveButton.classList.add("saveButton");
  saveButton.textContent = "Save";
  contentRight.appendChild(saveButton);

  inputText.value = "";
  inputText.focus();

  deleteButton.addEventListener("click", removeTodo);
  checkbox.addEventListener("click", completeTodo);
  editButton.addEventListener("click", updateTodo);
  saveButton.addEventListener("click", newTodoSave);
};

const newTodoSave = (e) => {
  const todo = e.target.parentElement.parentElement;
  const prevText = todo.firstChild.children[1].textContent;
  const newText = todo.firstChild.children[2].value;

  checkTodoFromStorage();
  todos.forEach((td) => {
    if (td.text === prevText) {
      td.text = newText;
    }
  });
  localStorage.setItem("todos", JSON.stringify(todos));

  todo.firstChild.children[1].textContent = newText;
  todo.classList.remove("-edited");
};

const updateTodo = (e) => {
  const todo = e.target.parentElement.parentElement;
  const prevText = todo.firstChild.children[1].textContent;
  const newText = todo.firstChild.children[2].value;

  todo.classList.add("-edited");

  todo.firstChild.children[2].value = prevText;
};

const completeTodo = (e) => {
  const todo = e.target.parentElement.parentElement;
  const text = todo.firstChild.children[1].textContent;

  checkTodoFromStorage();
  todos.forEach((td) => {
    if (td.text === text) td.isCompleted = !td.isCompleted;
  });

  localStorage.setItem("todos", JSON.stringify(todos));
};

const addTodoToStorage = (newTodo) => {
  checkTodoFromStorage();
  todos.push(newTodo);
  localStorage.setItem("todos", JSON.stringify(todos));
};

const checkTodoFromStorage = () => {
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
};

const showAlert = (type, message) => {
  const div = document.createElement("div");
  div.className = `alert${type}`;
  div.textContent = message;

  form.appendChild(div);

  setTimeout(() => {
    div.remove();
  }, 1100);
};

executeEvents();
