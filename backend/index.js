const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Temporary "database"
let tasks = [];
let id = 1;

/**
 * CREATE TASK
 */
app.post("/tasks", (req, res) => {
    const { title, description, dueDate } = req.body;

    if (!title) {
        return res.status(400).json({ message: "Title is required" });
    }

    const newTask = {
        id: id++,
        title,
        description: description || "",
        dueDate: dueDate || null,
        completed: false,
        createdAt: new Date()
    };

    tasks.push(newTask);

    res.json({
        message: "Task created",
        task: newTask
    });
});

/**
 * GET ALL TASKS (Newest first)
 */
app.get("/tasks", (req, res) => {
    const sortedTasks = [...tasks].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    res.json(sortedTasks);
});

/**
 * UPDATE TASK (full edit)
 */
app.put("/tasks/:id", (req, res) => {
    const taskId = parseInt(req.params.id);
    const { title, description, dueDate, completed } = req.body;

    const task = tasks.find(t => t.id === taskId);

    if (!task) {
        return res.status(404).json({ message: "Task not found" });
    }

    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (dueDate !== undefined) task.dueDate = dueDate;
    if (completed !== undefined) task.completed = completed;

    res.json({
        message: "Task updated",
        task
    });
});

/**
 * TOGGLE COMPLETE / INCOMPLETE (STEP 2 IMPORTANT)
 */
app.patch("/tasks/:id/toggle", (req, res) => {
    const taskId = parseInt(req.params.id);

    const task = tasks.find(t => t.id === taskId);

    if (!task) {
        return res.status(404).json({ message: "Task not found" });
    }

    task.completed = !task.completed;

    res.json({
        message: "Task status toggled",
        task
    });
});

/**
 * DELETE TASK
 */
app.delete("/tasks/:id", (req, res) => {
    const taskId = parseInt(req.params.id);

    tasks = tasks.filter(t => t.id !== taskId);

    res.json({
        message: "Task deleted"
    });
});

/**
 * START SERVER
 */
app.listen(5000, () => {
    console.log("Server running on port 5000");
});