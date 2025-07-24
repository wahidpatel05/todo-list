document.addEventListener("DOMContentLoaded", () => {
    const todoInput = document.getElementById("todo-input");
    const addTask = document.getElementById("add-task-btn");
    const list = document.getElementById("todo-list");
    const themeToggleBtn = document.getElementById("theme-toggle-btn");
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    
    tasks.forEach(task => {
        renderTask(task);
    });
    // Theme toggle functionality
    themeToggleBtn.addEventListener("click",()=>{
        document.body.classList.toggle("dark")
        document.body.classList.toggle("light")
        

    })


    addTask.addEventListener("click", function () {
        let taskText = todoInput.value.trim();
        if (taskText === "") return;

        const newTask = {
            id: Date.now(),
            task: taskText,
            completed: false
        };

        tasks.push(newTask);
        saveTask();
        renderTask(newTask);
        todoInput.value = "";
    });

    function renderTask(task) {
        const li = document.createElement("li");
        li.setAttribute("data-id", task.id);
        if (task.completed) li.classList.add("completed");

        li.innerHTML = `
            <span>${task.task}</span>
            <button class="delete-btn bg-red-500 text-white px-2 py-1 rounded ml-4">Delete</button>
        `;

        li.addEventListener("click", (e) => {
            if (e.target.tagName === "BUTTON") return;
            li.classList.toggle("completed");
            task.completed = !task.completed;
            saveTask();
        });

        li.querySelector('button').addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent toggle
            tasks = tasks.filter((t) => t.id !== task.id);
            li.remove();
            saveTask();
        });

        list.appendChild(li);
    }

    function saveTask() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
});
