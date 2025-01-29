import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import connectDB from "./utils/db";
import authRoutes from "./routes/authRoutes";
import taskRoutes from "./routes/taskRoutes";

dotenv.config(); // Load environment variables from .env

const app = express();
const port = 5000;

// Middleware
app.use(cors()); // Allow requests from any origin
app.use(bodyParser.json()); // Parse incoming JSON requests

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

app.listen(port, async () => {
  console.log(`Server is running on http://localhost:${port}`);
  await connectDB(); // Ensure that the connection to the DB is established before starting the server
});
