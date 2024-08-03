// src/redux/slices/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadState, saveState } from "@/utils/storageUtils";

const AUTH_STATE_KEY = "auth";

// Define a type for the auth state
interface IAuthState {
  token: string | null;
  user: any;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

// Define the initial state
const initialState: IAuthState = {
  token: null,
  user: null,
  status: "idle",
  error: null,
};

// Create the auth slice
const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    loginPending(state) {
      state.status = "loading";
      state.error = null;
    },
    loginSuccess(state, action: PayloadAction<{ token: string; user: any }>) {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.status = "succeeded";
      state.error = null;
      saveState(AUTH_STATE_KEY, state); // Save state on login success
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.status = "failed";
      state.error = action.payload;
    },
    logout(state) {
      state.token = null;
      state.user = null;
      state.status = "idle";
      state.error = null;
      saveState(AUTH_STATE_KEY, state); // Save state on logout
    },
    setUser(state, action: PayloadAction<any>) {
      state.user = action.payload;
      saveState(AUTH_STATE_KEY, state); // Save state when user data is set
    },
  },
});

// Export actions
export const { loginPending, loginSuccess, loginFailure, logout, setUser } =
  authSlice.actions;

// Export the reducer
export default authSlice.reducer;
