import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import api from "../api";
import { AxiosError } from "axios";

interface ServerError {
  message: string;
  status: number;
}

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

export const login = createAsyncThunk<
  { token: string }, // Résultat réussi: objet avec token
  { email: string; password: string },
  { rejectValue: { message: string } }
>("auth/login", async ({ email, password }, { rejectWithValue }) => {
  try {
    // Envoie une requête POST au serveur pour se connecter
    const {
      body: { token },
    } = await api.user.login({ email, password });

    return { token: token }; // Renvoie token en cas d'authentification réussie
  } catch (error) {
    const message =
      (error as AxiosError<ServerError>).response?.data.message || "Error";

    return rejectWithValue({ message });
  }
});

export const signOut = createAction("signOut");

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
          state.token = `Bearer ${action.payload.token}`;
        }
      )
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload?.message;
      });
    builder.addCase(signOut, () => initialState);
  },
});

export default authenticationSlice.reducer;
