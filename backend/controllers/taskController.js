import tasks from "../data/tasks.js";
import createTask from "../utils/createTask.js";

/**
 * GET /api/tasks
 * Returns all tasks
 */
const getAllTasks = (req, res) => {
  res.status(200).json(tasks);
};

/**
 * GET /api/tasks/:id
 * Returns a task by id
 */
const getTaskById = (req, res) => {
  const id = Number(req.params.id);
  const task = tasks.find((task) => task.id === id);

  if (!task) {
    return res.status(404).json({
      error: "Task not found",
    });
  }

  res.status(200).json(task);
};

/**
 * Post /api/tasks/
 * Creates a new task
 */
const addTask = (req, res) => {
  const { title, description } = req.body;

  if (!title || title.trim() === "") {
    return res.status(400).json({
      error: "The title entered must not be empty!",
    });
  }

  if (!description || description.trim() === "") {
    return res.status(400).json({
      error: "The description entered must not be empty",
    });
  }

  const taskExists = tasks.some(
    (task) =>
      task.title.toLowerCase() === title.trim().toLowerCase() &&
      task.description.toLowerCase() === description.trim().toLowerCase(),
  );

  if (taskExists) {
    return res.status(409).json({
      error: "Task already exists",
    });
  }

  const newTask = createTask(title, description);
  tasks.push(newTask);
  res.status(201).json(newTask);
};

export { getAllTasks, getTaskById, addTask };
