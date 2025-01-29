import express from "express";
import { authenticateJWT } from "../middlewates/authMiddleware";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/taskController";

const router = express.Router();

router.get("/", authenticateJWT as any, getTasks as any);
router.post("/", authenticateJWT as any, createTask as any);
router.put("/:id", authenticateJWT as any, updateTask as any);
router.delete("/:id", authenticateJWT as any, deleteTask as any);

export default router;
