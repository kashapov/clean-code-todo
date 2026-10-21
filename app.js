const taskInput = document.getElementById('new-task');
const addButton = document.querySelector('.task-row-wrapper button');
const todoList = document.getElementById('incompleteTasks');
const completedList = document.getElementById('completed-tasks');

const createNewTaskElement = function (taskString) {
  const listItem = document.createElement('li');

  const checkbox = document.createElement('input');
  const label = document.createElement('label');
  const editInput = document.createElement('input');
  const editButton = document.createElement('button');
  const deleteButton = document.createElement('button');
  const deleteButtonImg = document.createElement('img');

  label.innerText = taskString;
  label.className = 'task';

  checkbox.type = 'checkbox';
  editInput.type = 'text';
  editInput.className = 'task';

  // innerText encodes special characters; HTML does not.
  editButton.innerText = 'Edit';
  editButton.className = 'edit';

  deleteButton.className = 'delete';
  deleteButtonImg.src = './remove.svg';
  deleteButton.appendChild(deleteButtonImg);

  listItem.appendChild(checkbox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
};

const addTask = function () {
  if (!taskInput.value) return;
  const listItem = createNewTaskElement(taskInput.value);

  todoList.appendChild(listItem);
  bindTaskEvents(listItem, markTaskCompleted);

  taskInput.value = '';
};

const editTask = function () {
  const listItem = this.parentNode;

  const editInput = listItem.querySelector('input[type=text]');
  const label = listItem.querySelector('label');
  const editButton = listItem.querySelector('.edit');
  const isEditMode = listItem.classList.contains('editMode');

  if (isEditMode) {
    label.innerText = editInput.value;
    editButton.innerText = 'Edit';
  } else {
    editInput.value = label.innerText;
    editButton.innerText = 'Save';
  }

  listItem.classList.toggle('editMode');
};

const deleteTask = function () {
  const listItem = this.parentNode;
  const list = listItem.parentNode;
  list.removeChild(listItem);
};

const moveTask = function (listItem, targetList, checkboxHandler) {
  targetList.appendChild(listItem);
  bindTaskEvents(listItem, checkboxHandler);
};

const markTaskCompleted = function () {
  moveTask(this.parentNode, completedList, markTaskIncomplete);
};

const markTaskIncomplete = function () {
  moveTask(this.parentNode, todoList, markTaskCompleted);
};

addButton.addEventListener('click', addTask);

const bindTaskEvents = function (taskListItem, checkboxHandler) {
  const checkbox = taskListItem.querySelector('input[type=checkbox]');
  const editButton = taskListItem.querySelector('button.edit');
  const deleteButton = taskListItem.querySelector('button.delete');

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkbox.onchange = checkboxHandler;
};

const bindListItems = function (listHolder, checkboxHandler) {
  for (let i = 0; i < listHolder.children.length; i++) {
    bindTaskEvents(listHolder.children[i], checkboxHandler);
  }
};

bindListItems(todoList, markTaskCompleted);
bindListItems(completedList, markTaskIncomplete);
