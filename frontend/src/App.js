import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [filter, setFilter] = useState("all");

  // Fetch tasks
  const fetchTasks = async () => {
    const res = await fetch("http://localhost:5000/tasks");
    const data = await res.json();
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Add task
  const addTask = async () => {
    if (!title.trim()) return;

    await fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: title.trim(),
        description,
        dueDate,
      }),
    });

    setTitle("");
    setDescription("");
    setDueDate("");
    fetchTasks();
  };

  // Delete task
  const deleteTask = async (id) => {
    const confirmDelete = window.confirm("Delete this task?");
    if (!confirmDelete) return;

    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "DELETE",
    });

    fetchTasks();
  };

  // Toggle complete
  const toggleTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}/toggle`, {
      method: "PATCH",
    });

    fetchTasks();
  };

  // Edit task (SAFE VERSION)
  const updateTask = async (task) => {
    const newTitle = prompt("Edit title:", task.title);
    if (newTitle === null) return;

    const newDescription = prompt("Edit description:", task.description || "");
    if (newDescription === null) return;

    const newDueDate = prompt(
      "Edit due date (YYYY-MM-DD):",
      task.dueDate || ""
    );
    if (newDueDate === null) return;

    await fetch(`http://localhost:5000/tasks/${task.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: newTitle.trim(),
        description: newDescription,
        dueDate: newDueDate,
      }),
    });

    fetchTasks();
  };

  // Filter tasks
  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  // Counts
  const activeCount = tasks.filter((t) => !t.completed).length;
  const completedCount = tasks.filter((t) => t.completed).length;

  // Overdue logic (FIXED)
  const isOverdue = (task) => {
    if (!task.dueDate || task.completed) return false;
    return new Date(task.dueDate) < new Date().setHours(0, 0, 0, 0);
  };

  return (
    <div className="container">
      <h1>Task Manager</h1>

      {/* INPUTS */}
      <div className="input-box">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />

        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />

        <button className="add-btn" onClick={addTask}>
          Add
        </button>
      </div>

      {/* STATS */}
      <div style={{ marginBottom: "10px", color: "white" }}>
        <strong>Active:</strong> {activeCount} |{" "}
        <strong>Completed:</strong> {completedCount}
      </div>

      {/* FILTERS */}
      <div style={{ marginBottom: "15px" }}>
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("active")}>Active</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
      </div>

      {/* EMPTY STATE */}
      {filteredTasks.length === 0 && (
        <p style={{ textAlign: "center", color: "gray" }}>
          No tasks found. Add one!
        </p>
      )}

      {/* TASK LIST */}
      {filteredTasks.map((task) => (
        <div
          className="task"
          key={task.id}
          style={{
            border: isOverdue(task)
              ? "2px solid #ef4444"
              : "1px solid #ddd",
          }}
        >
          <div>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
            />

            <span
              style={{
                marginLeft: "10px",
                textDecoration: task.completed ? "line-through" : "none",
                color: task.completed
                  ? "gray"
                  : isOverdue(task)
                  ? "#ef4444"
                  : "black",
              }}
            >
              <strong>{task.title}</strong>
              <br />
              <small>{task.description}</small>
              <br />
              <small>
                Due: {task.dueDate || "No date"}
              </small>

              {isOverdue(task) && (
                <div style={{ color: "#ef4444", fontSize: "12px" }}>
                  ⚠ Overdue
                </div>
              )}
            </span>
          </div>

          <div className="task-buttons">
            <button className="edit-btn" onClick={() => updateTask(task)}>
              Edit
            </button>

            <button
              className="delete-btn"
              onClick={() => deleteTask(task.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;