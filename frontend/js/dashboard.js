const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "login.html";
}

const taskList = document.getElementById("taskList");

async function loadTasks() {

    try {

        const response = await fetch(
            "http://localhost:5000/api/tasks",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        const tasks = await response.json();

        taskList.innerHTML = "";

        tasks.forEach(task => {

            taskList.innerHTML += `
            <div class="task-card">
                <h3>${task.title}</h3>

                <p>
                    <strong>Description:</strong>
                    ${task.description || "No Description"}
                </p>

                <p>
                    <strong>Priority:</strong>
                    ${task.priority}
                </p>

                <p>
                    <strong>Due Date:</strong>
                    ${new Date(task.dueDate).toLocaleDateString()}
                </p>

                <button
                    class="delete-btn"
                    onclick="deleteTask('${task._id}')"
                >
                    Delete
                </button>
            </div>
            `;

        });

    } catch (error) {
        console.log(error);
    }

}

async function loadStats() {

    try {

        const response = await fetch(
            "http://localhost:5000/api/tasks/stats",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        const stats = await response.json();

        document.getElementById("stats").innerHTML = `
            <div class="stat-card">
                <h3>Total Tasks</h3>
                <p>${stats.totalTasks}</p>
            </div>

            <div class="stat-card">
                <h3>Completed</h3>
                <p>${stats.completedTasks}</p>
            </div>

            <div class="stat-card">
                <h3>Pending</h3>
                <p>${stats.pendingTask}</p>
            </div>
        `;

    } catch (error) {
        console.log(error);
    }

}

loadTasks();
loadStats();

document
    .getElementById("taskForm")
    .addEventListener("submit", async (e) => {

        e.preventDefault();

        const title =
            document.getElementById("title").value;

        const description =
            document.getElementById("description").value;

        const dueDate =
            document.getElementById("dueDate").value;

        const priority =
            document.getElementById("priority").value;

        try {

            await fetch(
                "http://localhost:5000/api/tasks",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        title,
                        description,
                        dueDate,
                        priority
                    })
                }
            );

            document.getElementById("taskForm").reset();

            loadTasks();
            loadStats();

        } catch (error) {
            console.log(error);
        }

    });

async function deleteTask(id) {

    try {

        await fetch(
            `http://localhost:5000/api/tasks/${id}`,
            {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        loadTasks();
        loadStats();

    } catch (error) {
        console.log(error);
    }

}

document
    .getElementById("logoutBtn")
    .addEventListener("click", () => {

        localStorage.removeItem("token");

        window.location.href = "login.html";

    });