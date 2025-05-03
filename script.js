// --- DOM Elements ---
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const emptyState = document.getElementById('emptyState');

// --- State ---
let tasks = [];

// --- Local Storage Sync ---
function loadTasks() {
  try {
    const data = localStorage.getItem('tasks');
    tasks = data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading tasks:', error);
    tasks = [];
  }
}

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// --- Core Functions ---
function addTask(text) {
  if (!text.trim()) return alert("Task cannot be empty!");

  const newTask = {
    id: Date.now(),
    text: text.trim(),
    completed: false,
  };
  tasks.push(newTask);
  saveTasks();
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  saveTasks();
  renderTasks();
}

function toggleTaskStatus(id) {
  tasks = tasks.map(task =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  saveTasks();
  renderTasks();
}

// --- Rendering ---
function renderTasks() {
  taskList.innerHTML = '';

  if (tasks.length === 0) {
    emptyState.style.display = 'block';
    return;
  } else {
    emptyState.style.display = 'none';
  }

  tasks.forEach(task => {
    const li = document.createElement('li');
    li.className = `task-item${task.completed ? ' completed' : ''}`;

    li.innerHTML = `
      <span onclick="toggleTaskStatus(${task.id})">${task.text}</span>
      <button onclick="deleteTask(${task.id})">Delete</button>
    `;

    taskList.appendChild(li);
  });
}

// --- Event Listeners ---
addTaskBtn.addEventListener('click', () => {
  addTask(taskInput.value);
  taskInput.value = '';
});

taskInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    addTask(taskInput.value);
    taskInput.value = '';
  }
});

// --- Init ---
loadTasks();
renderTasks();
