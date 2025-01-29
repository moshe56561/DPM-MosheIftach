import axios from "axios";

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post("http://localhost:5000/api/auth/login", {
      email,
      password,
    });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      // Handle AxiosError
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        throw new Error(error.response.data.message);
      }
    }
    throw error;
  }
};

export const register = async (email: string, password: string) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/auth/register",
      {
        email,
        password,
      }
    );
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      // Handle AxiosError
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        throw new Error(error.response.data.message);
      }
    }
    throw error;
  }
};
