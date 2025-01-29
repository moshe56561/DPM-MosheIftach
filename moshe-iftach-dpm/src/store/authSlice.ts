import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login, register } from "../api/auth";
import { eFormType } from "../enums/enums";
import { IAuthState } from "../interfaces/interfaces";

const initialState: IAuthState = {
  user: null,
  loading: false,
  error: null,
  registrationSuccess: null,
};

// General asyncThunk for login and register
const authRequest = (type: eFormType.LOGIN | eFormType.REGISTER) =>
  createAsyncThunk(
    `auth/${type}`,
    async ({ email, password }: { email: string; password: string }) => {
      const authFunc = type === eFormType.LOGIN ? login : register;
      const response = await authFunc(email, password);
      return response;
    }
  );

export const loginUser = authRequest(eFormType.LOGIN);
export const registerUser = authRequest(eFormType.REGISTER);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetRegistrationSuccess: (state) => {
      state.registrationSuccess = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        //TODO : USE COOCKIES TO STORE LOGIN
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Login failed";
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.registrationSuccess = null; // Reset registration status while pending
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.registrationSuccess = true; // Set to true or false based on response
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.registrationSuccess = false; // Failed registration
        state.error = action.error.message || "Registration failed";
      });
  },
});
export const { resetRegistrationSuccess } = authSlice.actions;

export default authSlice.reducer;
