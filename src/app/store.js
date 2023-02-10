import { configureStore } from "@reduxjs/toolkit";
import userSlience from "../features/users/userSlience";

export const store = configureStore({
  reducer: {
    users: userSlience,
  },
});
