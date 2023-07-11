import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import recruiterApi from "../../Common/api/recruiterApi";

export const PostJob = createAsyncThunk(
  "recruiter/post_jobs",
  async (payload) => {
    try {
      console.log(payload, "uuuu");
      const response = await recruiterApi.post("/post_jobs", payload);
      console.log("response", response);
      return response;
    } catch (err) {
      console.log(err);
    }
  }
);

export const GetAlltJobs = createAsyncThunk(
  "recruiter/all_jobs",
  async (recruiterId) => {
    try {
      console.log(recruiterId);
      const response = await recruiterApi.get(`/get_jobs/${recruiterId}`);
      console.log(response);
      return response;
    } catch (err) {
      console.log(err);
    }
  }
);

const initialState = {
  jobs: [],
  jobsById:{}
};

const jobSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(GetAlltJobs.fulfilled,(state,{payload})=>{
        state.jobsById=payload
    })
  },
});
export default jobSlice.reducer;