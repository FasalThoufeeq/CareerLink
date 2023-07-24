import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authApi from "../../Common/api/authApi";
import recruiterApi from "../../Common/api/recruiterApi";

export const RegisterRecruiter = createAsyncThunk(
  "recruiter/registerRecruiter",
  async (payload) => {
    try {
      const response = await authApi.post("/recruiter/signup", payload);
      return response;
    } catch (err) {
      console.log(err);
    }
  }
);

export const LoginRecruiter = createAsyncThunk(
  "recruiter/loginRecruiter",
  async (payload) => {
    try {
      const response = await authApi.post("/recruiter/login", payload);
      return response;
    } catch (err) {
      console.log(err);
    }
  }
);

export const GetRecruiterprofile = createAsyncThunk(
  "recruiter/get_recruiter_profile",
  async (profileId) => {
    try {
      const response = await recruiterApi.get(`/get_profile/${profileId}`);
      return response;
    } catch (err) {
      console.log(err);
    }
  }
);

export const UpdateRecruiterProfileDetails = createAsyncThunk(
  "recruiter/update_recruiter_profile",
  async ({ payload, profileId }) => {
    try {
      console.log(payload, profileId, "wwwwwwww");
      const response = await recruiterApi.put(
        `/update_profile/${profileId}`,
        payload,
        {
          headers: {
            "Content-Type": "application/json", // Set the Content-Type header to application/json
          },
        }
      );
      return response;
    } catch (err) {
      console.log(err);
    }
  }
);

export const UpdatingCompanylogo = createAsyncThunk(
  "recruiter/update_companylogo",
  async ({ payload, profileId }) => {
    try {
      const response = await recruiterApi.put(
        `/update_companylogo/${profileId}`,
        payload
      );
      return response;
    } catch (err) {
      console.log(err);
    }
  }
);

const initialState = {
  recruiters: {},
};

const recruiterSlice = createSlice({
  name: "recruiters",
  initialState,
  reducers: {
    LogoutRecruiter: (state) => {
      state.recruiters = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(RegisterRecruiter.pending, () => {
        console.log("pending");
      })
      .addCase(RegisterRecruiter.fulfilled, (state, { payload }) => {
        state.recruiters = payload.data;
      })
      .addCase(RegisterRecruiter.rejected, () => {
        console.log("Rejected");
      })
      .addCase(LoginRecruiter.pending, () => {
        console.log("pending");
      })
      .addCase(LoginRecruiter.fulfilled, (state, { payload }) => {
        state.recruiters = payload.data;
      })
      .addCase(LoginRecruiter.rejected, () => {
        console.log("Rejected");
      });
  },
});

// eslint-disable-next-line react-refresh/only-export-components
export const { LogoutRecruiter } = recruiterSlice.actions;
export default recruiterSlice.reducer;
