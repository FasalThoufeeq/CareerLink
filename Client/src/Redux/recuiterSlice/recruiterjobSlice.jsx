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

export const GetAllJobs = createAsyncThunk(
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

export const AppliedCandidates = createAsyncThunk(
  "recruiter/applied_candidates",
  async (jobId) => {
    try {
      const response = await recruiterApi.get(`/applied_candidates/${jobId}`);
      console.log(response);
      return response;
    } catch (err) {
      console.log(err);
    }
  }
);

export const ChangeStatus = createAsyncThunk(
  "recruiter/change_status",
  async ({ jobId, applicantId, changedStatus }) => {
    try {
      const response = await recruiterApi.post(
        `/change_status?jobId=${jobId}&applicantId=${applicantId}&status=${changedStatus}`
      );
      return response;
    } catch (err) {
      console.log(err);
    }
  }
);

export const EditingJobDetails = createAsyncThunk(
  "recruiter/edit_job",
  async ({ jobId, payload }) => {
    try {
      const response = await recruiterApi.put(`/edit_jobs/${jobId}`, payload);
      return response;
    } catch (err) {
      console.log(err);
    }
  }
);

export const GetJobDetails = createAsyncThunk(
  "recruiter/get_job",
  async (jobId) => {
    try {
      const response = await recruiterApi.get(`/get_job/${jobId}`);
      return response;
    } catch (err) {
      console.log(err);
    }
  }
);

const initialState = {
  jobs: [],
  jobsById: {},
};

const jobSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(GetAllJobs.fulfilled, (state, { payload }) => {
      state.jobsById = payload;
    });
  },
});
export default jobSlice.reducer;
