import { AppDispatch } from "../store/store"; // Import AppDispatch to type dispatch
import {
  createTask,
  editTask,
  deleteTask,
  fetchTasks,
} from "../store/tasksSlice";
import { IUser, ITask, ICardItem } from "../interfaces/interfaces";

export const handleCreateTask = async (
  task: ITask,
  user: IUser | null,
  dispatch: AppDispatch
) => {
  if (user) {
    await dispatch(createTask(task));
  }
};

export const handleEditTask = async (
  task: ITask,
  user: IUser | null,
  dispatch: AppDispatch
) => {
  if (user) {
    await dispatch(editTask(task));
  }
};

export const handleDeleteTask = async (
  task: ITask,
  user: IUser | null,
  dispatch: AppDispatch
) => {
  if (user) {
    await dispatch(deleteTask(task));
  }
};

export const handleGetTask = async (
  user: IUser | null,
  dispatch: AppDispatch
) => {
  if (user) {
    await dispatch(fetchTasks(user._id));
  }
};

export const mapCardToTask = (card: ICardItem, userId: string): ITask => {
  return {
    id: card.id.toString(),
    title: card.title,
    description: card.description,
    userId,
    createdAt: card.createdAt,
    updatedAt: card.updatedAt,
    status: card.status,
  };
};

export const mapTasksToCards = (tasks: ITask[]): ICardItem[] => {
  return tasks.map((task) => ({
    id: parseInt(task.id), // Convert string id back to number
    title: task.title,
    description: task.description,
    createdAt: task.createdAt,
    updatedAt: task.updatedAt,
    status: task.status,
    isEditing: false, // Assuming isEditing should be false by default
  }));
};
