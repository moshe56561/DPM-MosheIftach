import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "active", "done"],
      default: "pending",
    },
    id: { type: String, required: true },
  },
  { timestamps: true } // automatically adds createdAt and updatedAt
);

const Task = mongoose.model("Task", taskSchema, "tasks");

export default Task;
