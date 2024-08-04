// src/redux/slices/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadState, saveState } from "@/utils/storageUtils";
import { IAuthState, IUser } from "@/interfaces";

const AUTH_STATE_KEY = "auth";

const initialState: IAuthState = {
  token: null,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<{ token: string; user: IUser }>) {
      state.token = action.payload.token;
      state.user = action.payload.user;
      saveState(AUTH_STATE_KEY, state); // Save state on login success
    },
    logout(state) {
      state.token = null;
      state.user = null;
      saveState(AUTH_STATE_KEY, state);
    },
    setUser(state, action: PayloadAction<IUser>) {
      state.user = action.payload;
      saveState(AUTH_STATE_KEY, state);
    },
  },
});

// Export actions
export const { loginSuccess, logout, setUser } = authSlice.actions;

// Export the reducer
export default authSlice.reducer;
