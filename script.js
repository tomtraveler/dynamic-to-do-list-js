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
Use code with caution.

Sources
github.com/ranjan-sri/af






Detailed Instructions for JavaScript Implementation
Initialize and Load Tasks:
At the start of your script (inside the 'DOMContentLoaded' listener if continuing from the previous task), check Local Storage for an existing list of tasks.
Use localStorage.getItem('tasks') to retrieve the task list. If tasks are found, parse them from JSON to an array and populate the task list on the page.
Update Task Addition Functionality:
Modify the addTask function to also save tasks to Local Storage whenever a new task is added.
After appending the new task to the DOM, update your tasks array and save it back to Local Storage by serializing the array to JSON using JSON.stringify().
Implement Task Removal with Local Storage Update:
When a task is removed by clicking the “Remove” button, also remove it from the tasks array in your JavaScript.
Then, update Local Storage with the new array to reflect this change.
Code for Loading Tasks from Local Storage:
Write a function that loads tasks from Local Storage when the page loads.
This function should create task elements in the DOM for each task found in Local Storage, ensuring the list reflects saved data.
Saving Tasks to Local Storage:
Every time a task is added or removed, update the array of tasks in your script, then save this updated array to Local Storage.
Ensure the tasks remain available even after the browser is closed or refreshed.
Example Code Snippets
Loading Tasks from Local Storage:
function loadTasks() {
const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
storedTasks.forEach(taskText => addTask(taskText, false)); // 'false' indicates not to save again to Local Storage
}

// Adjust `addTask` to optionally save tasks to avoid duplication when loading from Local Storage
function addTask(taskText, save = true) {
// Task creation logic remains the same

if (save) {
const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
storedTasks.push(taskText);
localStorage.setItem('tasks', JSON.stringify(storedTasks));
}
}


Show drafts



1
Here's the updated script.js file incorporating Local Storage functionality for the To-Do List application:

JavaScript
// Add event listener for page load
document.addEventListener('DOMContentLoaded', function() {

  // Select DOM elements
  const addButton = document.getElementById('add-task-btn');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');

  // Load tasks from Local Storage
  function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    storedTasks.forEach(taskText => addTask(taskText, false));  // Don't save again on load
  }

  loadTasks();  // Call the loadTasks function on page load

  // Create the addTask function
  function addTask(taskText, save = true) {
    // Get and trim the task text
    const trimmedText = taskText.trim();

    // Check if task is empty
    if (trimmedText === '') {
      alert('Please enter a task!');
      return;
    }

    // Create list item and remove button
    const listItem = document.createElement('li');
    listItem.textContent = trimmedText;
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.classList.add('remove-btn');

    // Add click event listener to remove button
    removeBtn.addEventListener('click', function() {
      taskList.removeChild(listItem);

      // Update tasks array and Local Storage on removal
      const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
      const taskIndex = storedTasks.indexOf(trimmedText);
      storedTasks.splice(taskIndex, 1);  // Remove task from array
      localStorage.setItem('tasks', JSON.stringify(storedTasks));
    });

    // Append remove button and list item to task list
    listItem.appendChild(removeBtn);
    taskList.appendChild(listItem);

    // Clear task input field and update Local Storage if needed
    taskInput.value = '';
    if (save) {
      const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
      storedTasks.push(trimmedText);
      localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }
  }

  // Add event listeners
  addButton.addEventListener('click', addTask);
  taskInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
      addTask();
    }
  });
});
