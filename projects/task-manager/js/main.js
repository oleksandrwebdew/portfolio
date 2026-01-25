// ===============================
// TASK MANAGER — FULL VERSION
// ===============================

// --- DOM элементы ---
const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const counter = document.getElementById("counter");
const themeBtn = document.getElementById("themeToggle");
const filterButtons = document.querySelectorAll(".filters button");

// --- Состояние ---
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

// ===============================
// РЕНДЕР ЗАДАЧ
// ===============================
function renderTasks() {
  taskList.innerHTML = "";

  let filteredTasks = tasks;

  if (currentFilter === "active") {
    filteredTasks = tasks.filter(task => !task.completed);
  }

  if (currentFilter === "completed") {
    filteredTasks = tasks.filter(task => task.completed);
  }

  filteredTasks.forEach((task, index) => {
    const li = document.createElement("li");

    if (task.completed) {
      li.classList.add("completed");
    }

    // checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;

    checkbox.addEventListener("change", () => {
      task.completed = checkbox.checked;
      saveTasks();
      renderTasks();
    });

    // текст задачи
    const span = document.createElement("span");
    span.textContent = task.text;

    // редактирование по двойному клику
    span.addEventListener("dblclick", () => {
      const input = document.createElement("input");
      input.type = "text";
      input.value = task.text;

      input.addEventListener("blur", () => {
        task.text = input.value.trim() || task.text;
        saveTasks();
        renderTasks();
      });

      input.addEventListener("keydown", e => {
        if (e.key === "Enter") {
          input.blur();
        }
      });

      li.replaceChild(input, span);
      input.focus();
    });

    // кнопка удаления
    const btn = document.createElement("button");
    btn.textContent = "❌";
    btn.addEventListener("click", () => {
      deleteTask(index);
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(btn);

    taskList.appendChild(li);
  });

  updateCounter();
}

// ===============================
// ДОБАВЛЕНИЕ ЗАДАЧИ
// ===============================
taskForm.addEventListener("submit", e => {
  e.preventDefault();

  const value = taskInput.value.trim();
  if (!value) return;

  tasks.push({
    text: value,
    completed: false
  });

  taskInput.value = "";
  saveTasks();
  renderTasks();
});

// ===============================
// УДАЛЕНИЕ
// ===============================
function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

// ===============================
// СЧЁТЧИК
// ===============================
function updateCounter() {
  const completed = tasks.filter(task => task.completed).length;
  counter.textContent = `Выполнено: ${completed} из ${tasks.length}`;
;
}

// ===============================
// ФИЛЬТРЫ
// ===============================
filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    currentFilter = btn.dataset.filter;
    renderTasks();
  });
});

// ===============================
// ТЁМНАЯ ТЕМА
// ===============================
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
}

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  localStorage.setItem(
    "theme",
    document.body.classList.contains("dark") ? "dark" : "light"
  );
});

// ===============================
// LOCAL STORAGE
// ===============================
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// ===============================
// ИНИЦИАЛИЗАЦИЯ
// ===============================
renderTasks();