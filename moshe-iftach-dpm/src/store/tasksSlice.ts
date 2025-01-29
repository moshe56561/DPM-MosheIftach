import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ITask } from "../interfaces/interfaces";
import { RootState } from "../store/store"; // Import RootState for type safety

interface TasksState {
  tasks: ITask[];
  loading: boolean;
  error: string | null;
}

const initialState: TasksState = {
  tasks: [],
  loading: false,
  error: null,
};

export const createTask = createAsyncThunk(
  "tasks/create",
  async (task: ITask, { rejectWithValue, getState }) => {
    try {
      // Access the token from the Redux store using getState
      const state = getState() as RootState; // Get the state type
      const token = state.auth.user?.token;

      if (!token) {
        return rejectWithValue("Authorization token is missing");
      }

      const response = await axios.post(
        "http://localhost:5000/api/tasks",
        {
          title: task.title,
          description: task.description,
          status: task.status,
          userId: task.userId,
          createdAt: task.createdAt,
          id: task.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Attach the token to the request header
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create task"
      );
    }
  }
);

export const editTask = createAsyncThunk(
  "tasks/edit",
  async (
    task: ITask, // Accept the full task object
    { rejectWithValue, getState }
  ) => {
    try {
      // Access the token from the Redux store using getState
      const state = getState() as RootState; // Get the state type
      const token = state.auth.user?.token;

      if (!token) {
        return rejectWithValue("Authorization token is missing");
      }

      const response = await axios.put(
        `http://localhost:5000/api/tasks/${task.id}`,
        {
          title: task.title,
          description: task.description,
          status: task.status,
          userId: task.userId, // Pass the full task object
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Attach the token to the request header
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update task"
      );
    }
  }
);

export const deleteTask = createAsyncThunk(
  "tasks/delet",
  async (
    task: ITask, // Accept the full task object
    { rejectWithValue, getState }
  ) => {
    try {
      // Access the token from the Redux store using getState
      const state = getState() as RootState; // Get the state type
      const token = state.auth.user?.token;

      if (!token) {
        return rejectWithValue("Authorization token is missing");
      }

      const response = await axios.delete(
        `http://localhost:5000/api/tasks/${task.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Attach the token to the request header
          },
        }
      );

      return response.data; // Return the response data to update the state
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete task"
      );
    }
  }
);

export const fetchTasks = createAsyncThunk(
  "tasks/fetchAll",
  async (userId: string, { rejectWithValue, getState }) => {
    try {
      // Access the token from the Redux store using getState
      const state = getState() as RootState;
      const token = state.auth.user?.token;

      if (!token) {
        return rejectWithValue("Authorization token is missing");
      }

      const response = await axios.get(
        `http://localhost:5000/api/tasks?userId=${userId}`, // Add userId to the query parameters
        {
          headers: {
            Authorization: `Bearer ${token}`, // Attach the token to the request header
          },
        }
      );

      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch tasks"
      );
    }
  }
);

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks.push(action.payload);
      })
      .addCase(createTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.tasks = [...state.tasks];
      })
      .addCase(editTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.map((task) =>
          task.id === action.payload.id ? action.payload : task
        );
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter(
          (task) => task.id !== action.meta.arg.id
        );
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.tasks = [...state.tasks];
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default tasksSlice.reducer;
