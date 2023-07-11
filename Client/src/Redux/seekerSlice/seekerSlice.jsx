import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authApi from "../../Common/api/authApi";

export const registerSeeker = createAsyncThunk(
  "seeker/registerSeeker",
  async (payload) => {
    try {
      const response = await authApi.post("signup", payload);
      return response;
    } catch (err) {
      console.log(err);
    }
  }
);

export const loginSeeker = createAsyncThunk("seeker/login", async (payload) => {
  try {
    const response = await authApi.post("login", payload);
    return response;
  } catch (err) {
    console.log(err);
  }
});

export const googleLoginSeeker = createAsyncThunk("seeker/google-login", async (payload) => {
  try {
    const response = await authApi.post("google-login", payload);
    console.log(response,"apoi res");
    return response;
    
  } catch (err) {
    console.log(err);
  }
});

const initialState = {
  seekers: {},
};

const seekerSlice = createSlice({
  name: "seeker",
  initialState,
  reducers: {
    logoutSeeker: (state) => {
      state.seekers = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerSeeker.pending, () => {
        console.log("pending");
      })
      .addCase(registerSeeker.fulfilled, (state, { payload }) => {
        console.log("registered successfully");
        state.seekers = payload.data;
      })
      .addCase(registerSeeker.rejected, () => {
        console.log("rejected");
      })
      .addCase(loginSeeker.pending,()=>{
        console.log('pending');
      })
      .addCase(loginSeeker.fulfilled,(state,{payload})=>{
        console.log("login successfully");
        state.seekers=payload.data
      })
      .addCase(loginSeeker.rejected, () => {
        console.log("rejected");
      })
      .addCase(googleLoginSeeker.fulfilled,(state,{payload})=>{
        console.log("login successfully");
        state.seekers = payload.data;
      })
      .addCase(googleLoginSeeker.rejected, () => {
        console.log("rejected");
      })
      .addCase(googleLoginSeeker.pending,()=>{
        console.log('pending');
      })
  },
});
export const { logoutSeeker } = seekerSlice.actions;
export default seekerSlice.reducer;
