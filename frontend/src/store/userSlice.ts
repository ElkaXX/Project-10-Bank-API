import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api";
import { AxiosError } from "axios";

interface ServerError {
  message: string;
  status: number;
}

export interface UserState {
  isLoading: boolean;
  firstName: string;
  lastName: string;
  error?: string;
}

const initialState: UserState = {
  isLoading: false,
  firstName: "",
  lastName: "",
};

export const getUserProfile = createAsyncThunk<
  { firstName: string; lastName: string },
  void,
  { rejectValue: { message: string } }
>("user/get-profile", async (_, { rejectWithValue }) => {
  try {
    const { firstName, lastName } = await api.user.getProfile();

    return { firstName, lastName };
  } catch (error) {
    const message =
      (error as AxiosError<ServerError>).response?.data.message || "Error";

    return rejectWithValue({ message });
  }
});

export const editUserProfile = createAsyncThunk<
  { firstName: string; lastName: string },
  { firstName: string; lastName: string },
  { rejectValue: { message: string } }
>("user/edit-profile", async ({ firstName, lastName }, { rejectWithValue }) => {
  try {
    await api.user.editProfile({ firstName, lastName });

    return { firstName, lastName };
  } catch (error) {
    const message =
      (error as AxiosError<ServerError>).response?.data.message || "Error";

    return rejectWithValue({ message });
  }
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.firstName = action.payload.firstName;
        state.lastName = action.payload.lastName;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.error = action.payload?.message;
      });

    builder
      .addCase(editUserProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editUserProfile.fulfilled, (state, action) => {
        state.firstName = action.payload.firstName;
        state.lastName = action.payload.lastName;
        state.isLoading = false;
      })
      .addCase(editUserProfile.rejected, (state, action) => {
        state.error = action.payload?.message;
      });
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
