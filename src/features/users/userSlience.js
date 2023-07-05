import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userServices from "./userSerive";

const initialState = {
  users: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// all users
export const getUsers = createAsyncThunk("/users", async () => {
  try {
    return await userServices.getUsers();
  } catch (error) {
    console.log(error);
  }
});

// adduser details
export const addUser = createAsyncThunk("/user/create", async (userData) => {
  try {
    return await userServices.addUser(userData);
  } catch (error) {
    console.log(error);
  }
});

// delete users
export const deleteUser = createAsyncThunk("/user/id", async (userId) => {
  console.log(userId);
  try {
    return await userServices.deleteUser(userId);
  } catch (error) {
    console.log(error);
  }
});

// update user
export const updateUser = createAsyncThunk("/user/:id", async (userData) => {
  try {
    return await userServices.updateUser(userData);
  } catch (error) {
    console.log(error);
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.users = [...action.payload];
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.users = null;
      })

      .addCase(addUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.users = [...state.users, action.payload];
        state.message = "user added successfully";
      })
      .addCase(addUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = "unable to add user";
        state.users = null;
      })
      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const { arg } = action.meta;
        if (arg) {
          state.users = state.users.filter((user) => user._id !== arg);
          state.users = [...state.users];
        }
        state.message = "user deleted successfully";
      })
      .addCase(deleteUser.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.message = "unable to deleted";
        state.users = null;
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const { id } = action.meta.arg;
        console.log(action.meta.arg.id);
        if (id) {
          state.users = state.users.map((item) =>
            item._id === id ? action.payload : item
          );
        }
        console.log(action.payload);
      })
      .addCase(updateUser.rejected, (state) => { 
        state.isLoading = false;
        state.isError = true;
        state.message = "unable to deleted";
      });
  },
});
export const { reset } = authSlice.actions;
export default authSlice.reducer;
