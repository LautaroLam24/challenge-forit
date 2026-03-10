import tasks from "../data/tasks.js";
import createTask from "../utils/createTask.js";

/**
 * GET /api/tasks
 * Trae todas las tareas
 */
export const getAllTasks = (req, res) => {
  res.status(200).json(tasks);
};

/**
 * GET /api/tasks/:id
 * Obtiene una tarea por id
 */
export const getTaskById = (req, res) => {
  const id = Number(req.params.id);
  const task = tasks.find((task) => task.id === id);

  if (!task) {
    return res.status(404).json({
      error: "Task not found",
    });
  }

  res.status(200).json(task);
};
