//select elements
const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");

//load task from local storage on page load
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
renderTasks();

//add new task
taskForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const newTask = taskInput.value.trim();
  if (newTask === "") return;

  const task = {
    id: Date.now(),
    text: newTask,
    completed: false,
  };
  tasks.push(task);
  saveTasks();
  renderTasks();
  taskInput.value = "";
});

//render all tasks to the UI
function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.className = "task-item" + (task.completed ? " completed" : "");

    li.innerHTML = `  
    <span>${task.text}</span>
      <div class="task-actions">
        <button class="complete">✓</button>
        <button class="edit">Edit</button>
        <button class="delete">✕</button>
      </div>`;

    //complete button
    li.querySelector(".complete").addEventListener("click", () => {
      task.completed = !task.completed;
      saveTasks();
      renderTasks();
    });

    //edit button
    li.querySelector(".edit").addEventListener("click", () => {
      const newText = prompt("Edit task:", task.text);
      if (newText !== null && newText.trim() !== "") {
        task.text = newText.trim();
        saveTasks();
        renderTasks();
      }
    });

    //delete button
    li.querySelector(".delete").addEventListener("click", () => {
      tasks = tasks.filter((t) => t.id !== task.id);
      saveTasks();
      renderTasks();
    });

    taskList.appendChild(li);
  });
}

//save to localstorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
