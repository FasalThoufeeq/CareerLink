import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import seekerApi from "../../Common/api/seekerApi";

export const GetAllJobs = createAsyncThunk("seeker/getAllJobs", async () => {
  try {
    const response = await seekerApi.get("/all_jobs");
    return response;
  } catch (err) {
    console.log(err);
  }
});
export const ApplyJobs = createAsyncThunk(
  "seeker/apply_jobs",
  async ({ jobId, applicantId }) => {
    try {
      const response = await seekerApi.post(
        `/apply_job?jobId=${jobId}&applicantId=${applicantId}`
      );
      return response;
    } catch (err) {
      console.log(err);
    }
  }
);

export const GettingSeekerProfile = createAsyncThunk(
  "seeker/seeker_profile",
  async (profileId) => {
    try {
      const response = await seekerApi.get(`/seeker_profile/${profileId}`);
      return response;
    } catch (err) {
      console.log(err);
    }
  }
);

export const AppliedJobs = createAsyncThunk(
  "seeker/applied_jobs",
  async (profileId) => {
    try {
      const response = await seekerApi.get(`/applied_jobs/${profileId}`);
      return response;
    } catch (err) {
      console.log(err);
    }
  }
);

export const CancelJob = createAsyncThunk(
  "seeker/cancel_job",
  async ({ jobId, profileId }) => {
    try {
      const response = await seekerApi.put(
        `/cancel_job?jobId=${jobId}&applicantId=${profileId}`
      );
      return response;
    } catch (err) {
      console.log(err);
    }
  }
);



const initialState = {
  jobs: [],
};

const seekerJobSlice = createSlice({
  name: "seekerJobs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(GetAllJobs.fulfilled, (state, { payload }) => {
      state.jobs = payload;
    });
  },
});

export default seekerJobSlice.reducer;
