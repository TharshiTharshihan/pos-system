import { createSlice } from "@reduxjs/toolkit";

interface User {
  name: string;
  email: string;
  [key: string]: unknown;
}

interface UserState {
  currentUser: User | null;
  isLoggedIn: boolean;
}

const initialState: UserState = {
  currentUser: null,
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loggedIn: (state, action) => {
      state.currentUser = action.payload;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.currentUser = null;
      state.isLoggedIn = false;
    },
  },
});

export const { loggedIn, logout } = userSlice.actions;
export default userSlice.reducer;
