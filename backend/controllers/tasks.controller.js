import { v4 as uuidv4 } from "uuid";

// in-memory tasks
let tasks = [
  { id: uuidv4(), title: "Sample Task", priority: "medium", completed: false }
];

// sanitize
const sanitizeString = (str) => {
  if (typeof str !== "string") return "";
  return str.replace(/[<>]/g, "").trim();
};

// GET all tasks
export const getTasks = (req, res) => {
  res.json(tasks);
};

// CREATE task
export const createTask = (req, res) => {
  const { title, priority } = req.body;

  if (!title || title.trim() === "") {
    return res.status(400).json({
      error: "Task title is required"
    });
  }

  if (!["low", "medium", "high"].includes(priority)) {
    return res.status(400).json({
      error: "Priority must be low, medium or high"
    });
  }

  const newTask = {
    id: uuidv4(),
    title: sanitizeString(title),
    priority,
    completed: false
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
};

// UPDATE task
export const updateTask = (req, res) => {
  const { id } = req.params;
  const { completed, priority } = req.body;

  const taskIndex = tasks.findIndex(t => t.id === id);

  if (taskIndex === -1) {
    return res.status(404).json({ error: "Task not found" });
  }

  if (completed !== undefined) {
    tasks[taskIndex].completed = completed;
  }

  if (priority && ["low", "medium", "high"].includes(priority)) {
    tasks[taskIndex].priority = priority;
  }

  res.json(tasks[taskIndex]);
};

// DELETE task
export const deleteTask = (req, res) => {
  const { id } = req.params;

  const taskIndex = tasks.findIndex(t => t.id === id);

  if (taskIndex === -1) {
    return res.status(404).json({ error: "Task not found" });
  }

  const deletedTask = tasks.splice(taskIndex, 1)[0];

  res.json(deletedTask);
};