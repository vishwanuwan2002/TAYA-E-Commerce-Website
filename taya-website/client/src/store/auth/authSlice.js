import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

const createAuthAsyncThunk = (name, config) => {
  return createAsyncThunk(name, async (data, { rejectWithValue }) => {
    try {
      const response = await axios(config(data));
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue({ message: "An unexpected network error occurred." });
    }
  });
};

export const registerUser = createAuthAsyncThunk("auth/register", (formData) => ({
  url: "http://localhost:5000/api/auth/register",
  method: "POST",
  data: formData,
}));

export const loginUser = createAuthAsyncThunk("auth/login", (formData) => ({
  url: "http://localhost:5000/api/auth/login",
  method: "POST",
  data: formData,
  withCredentials: true,
}));

export const logoutUser = createAuthAsyncThunk("auth/logout", () => ({
  url: "http://localhost:5000/api/auth/logout",
  method: "POST",
  withCredentials: true,
}));

export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/auth/check-auth",
        {
          withCredentials: true,
          headers: {
            "Cache-Control": "no-cache",
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : { message: "Auth check failed" });
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    const handlePending = (state) => {
      state.isLoading = true;
      state.error = null;
    };
    const handleRejected = (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    };

    builder
      // Register
      .addCase(registerUser.pending, handlePending)
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(registerUser.rejected, handleRejected)

      // Login
      .addCase(loginUser.pending, handlePending)
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload;
      })

      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
      })

      // Check Auth
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isAuthenticated = action.payload.success;
        state.user = action.payload.success ? action.payload.user : null;
        state.isLoading = false;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.isLoading = false;
      });
  },
});

export const { resetError } = authSlice.actions;
export default authSlice.reducer;
