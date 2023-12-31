import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import recruiterApi from "../../Common/api/recruiterApi";
import authApi from '../../Common/api/authApi'

export const PostJob = createAsyncThunk(
  "recruiter/post_jobs",
  async (payload) => {
    try {
      const response = await recruiterApi.post("/post_jobs", payload);
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
      const response = await recruiterApi.get(`/get_jobs/${recruiterId}`);
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

export const InviteEmail = createAsyncThunk(
  "recruiter/invite",
  async (payload) => {
    try {
      const response = await authApi.post(
        `/invite_email`,
        payload
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

export const PushNotification=createAsyncThunk(
  "recruiter/get_job",
  async (payload) => {
    try {
      const response = await recruiterApi.put(`/push_notification`,payload);
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
