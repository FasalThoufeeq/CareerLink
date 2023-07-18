import mongoose from 'mongoose';

const recruiterProfileSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
    },
    userName: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    companyAddress: {
      type: String,
    },
    companySize: {
      type: Number,
    },
    industry: {
      type: String,
    },

    about: {
      type: String,
    },
    logo: {
      type: String, // Store the path or URL of the logo image
    },
  },
  { timestamps: true }
);

export const RecruiterProfile = mongoose.model(
  'RecruiterProfile',
  recruiterProfileSchema
);
