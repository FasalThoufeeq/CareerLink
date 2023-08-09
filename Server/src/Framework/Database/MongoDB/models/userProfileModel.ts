import mongoose from "mongoose";

const userProfileSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  profilePicture: {
    type: String,
  },
  education: {
    type: String,
  },
  languages: {
    type: [String],
    default: [],
  },
  resume: {
    type: String,
  },
  experience: {
    type: String,
  },
  skills: {
    type: [String],
    default: [],
  },
  appliedJobs: {
    type: [
      {
        _id: {
          type: String,
          ref: "Job",
        },
        status: {
          type: String,
          default: "pending",
        },
      },
    ],
    ref: "Job",
  },
  notifications: {
    type: [
      {
        notification: {
          type: String,
        },
        notificationSummary: {
          type: String,
        },
      },
    ],
  },
});

export const UserProfile = mongoose.model("UserProfile", userProfileSchema);
