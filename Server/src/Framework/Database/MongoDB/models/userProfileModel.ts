import mongoose from 'mongoose';

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
  appliedJobs: {
    type: [
      {
        _id: {
          type: String,
          ref: 'Job',
        },
        status: {
          type: String,
          default: 'pending',
        },
      },
    ],
    ref: 'Job',
  },
});

export const UserProfile = mongoose.model('UserProfile', userProfileSchema);
