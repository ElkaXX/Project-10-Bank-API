import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import api from "../api";

export interface AuthenticationState {
  isLoading: boolean;
  userInfo?: {
    firstName: string;
    lastName: string;
  };
  token?: string;
  error?: string;
  isAuthorized: boolean;
}

const initialState: AuthenticationState = {
  isLoading: false,
  isAuthorized: false,
};

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }: { email: string; password: string }) => {
    const {
      body: { token },
    } = await api.user.login({ email, password });

    return { token: token };
  }
);

export const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        login.fulfilled,
        (state, action: PayloadAction<{ token: string }>) => {
          state.isLoading = false;
          state.isAuthorized = true;
          state.token = action.payload.token;
        }
      )
      .addCase(login.rejected, (state) => {
        state.error = "error";
      });
  },
});

export default authenticationSlice.reducer;
