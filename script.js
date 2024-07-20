// Add event listener for page load
document.addEventListener('DOMContentLoaded', function() {

  // Select DOM elements
  const addButton = document.getElementById('add-task-btn');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');

  // Create the addTask function
  function addTask() {
    // Get and trim the task text
    const taskText = taskInput.value.trim();

    // Check if task is empty
    if (taskText === '') {
      alert('Please enter a task!');
      return;
    }

    // Create list item and remove button
    const listItem = document.createElement('li');
    listItem.textContent = taskText;
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.classList.add('remove-btn');

    // Add click event listener to remove button
    removeBtn.addEventListener('click', function() {
      taskList.removeChild(listItem);
    });

    // Append remove button and list item to task list
    listItem.appendChild(removeBtn);
    taskList.appendChild(listItem);

    // Clear task input field
    taskInput.value = '';
  }

  // Add event listeners
  addButton.addEventListener('click', addTask);
  taskInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
      addTask();
    }
