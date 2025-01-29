import { Response } from "express";
import Task from "../models/Task";

export const getTasks = async (req: any, res: Response) => {
  try {
    const userId = req.user.id;
    const tasks = await Task.find({ userId });

    if (tasks.length === 0) {
      return res.status(404).json({ message: "No tasks found for this user" });
    }

    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving tasks" });
  }
};

export const createTask = async (req: any, res: Response) => {
  try {
    const { title, description, status, userId, id } = req.body;

    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "Title and description are required" });
    }

    const newTask = new Task({
      title,
      description,
      status: status.toLowerCase() || "pending",
      userId,
      id,
    });

    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error: any) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const updateTask = async (req: any, res: Response) => {
  try {
    const { title, description, status, userId } = req.body;
    const taskId = req.params.id;

    const task = await Task.findOne({ id: taskId });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    task.title = title;
    task.description = description;
    task.status = status.toLowerCase();
    task.userId = userId;

    await task.save();
    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating task" });
  }
};

export const deleteTask = async (req: any, res: Response) => {
  try {
    const taskId = req.params.id;

    const task = await Task.findOneAndDelete({ id: taskId });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to delete task" });
  }
};
