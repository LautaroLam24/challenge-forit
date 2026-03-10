import express from "express";
import {
  addTask,
  getAllTasks,
  getTaskById,
} from "../controllers/taskController.js";
import createTask from "../utils/createTask.js";

const router = express.Router();

router.get("/", getAllTasks);
router.get("/:id", getTaskById);
router.post("/", addTask);

export default router;
