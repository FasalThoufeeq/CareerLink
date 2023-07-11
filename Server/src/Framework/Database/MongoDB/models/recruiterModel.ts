import mongoose, { Schema, model } from 'mongoose';

const recruiterSchema = new Schema(
  {
    companyName: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    userName: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },

    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please add a valid email'],
    },

    password: {
      type: String,
      trim: true,
      required: true,
      minlength: 6,
    },
    profileId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'RecruiterProfile',
    },
  },
  { timestamps: true }
);

export const Recruiter = model('Recruiter', recruiterSchema);
