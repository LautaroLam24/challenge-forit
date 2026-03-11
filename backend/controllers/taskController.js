import tasks from "../data/tasks.js";
import createTask from "../utils/createTask.js";

/**
 *  Helper function to find a task by id
 */
const findTaskById = (id) => {
  return tasks.find((task) => task.id === id);
};

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
  const id = req.params.id;
  const task = findTaskById(id);

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
const addTask = (req, res, next) => {
  try {
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
  } catch (error) {
    next(error);
  }
};

/**
 * PUT /api/tasks/:id
 * Updates an existing task
 */
const updateTask = (req, res, next) => {
  try {
    const id = req.params.id;
    const { title, description, completed } = req.body;

    if (
      title === undefined &&
      description === undefined &&
      completed === undefined
    ) {
      return res.status(400).json({
        error: "At least one field must be provided to update",
      });
    }

    const task = findTaskById(id);

    if (!task) {
      return res.status(404).json({
        error: "Task not found",
      });
    }

    if (title !== undefined) {
      if (typeof title !== "string" || title.trim() === "") {
        return res.status(400).json({
          error: "Title cannot be empty",
        });
      }

      task.title = title.trim();
    }

    if (description !== undefined) {
      if (typeof description !== "string" || description.trim() === "") {
        return res.status(400).json({
          error: "Description cannot be empty",
        });
      }

      task.description = description.trim();
    }

    if (completed !== undefined) {
      if (typeof completed !== "boolean") {
        return res.status(400).json({
          error: "Completed must be boolean",
        });
      }

      task.completed = completed;
    }

    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};

/**
 * DELETE /api/tasks/:id
 * Deletes a task by id
 */
const deleteTask = (req, res, next) => {
  try {
    const id = req.params.id;

    const taskIndex = tasks.findIndex((task) => task.id === id);

    if (taskIndex === -1) {
      return res.status(404).json({
        error: "Task not found",
      });
    }

    const deletedTask = tasks.splice(taskIndex, 1)[0];

    res.status(200).json({
      message: "Task deleted successfully",
      task: deletedTask,
    });
  } catch (error) {
    next(error);
  }
};

export { getAllTasks, getTaskById, addTask, updateTask, deleteTask };
