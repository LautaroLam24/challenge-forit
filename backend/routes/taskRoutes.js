import express from "express";
import {
  addTask,
  getAllTasks,
  getTaskById,
  updateTask,
} from "../controllers/taskController.js";
import createTask from "../utils/createTask.js";

const router = express.Router();

router.get("/", getAllTasks);
router.get("/:id", getTaskById);
router.post("/", addTask);
router.put("/:id", updateTask);

export default router;
