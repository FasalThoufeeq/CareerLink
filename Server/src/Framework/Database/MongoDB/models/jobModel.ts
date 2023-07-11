import mongoose, { Schema, model } from 'mongoose';

const jobSchema = new Schema(
  {
    jobTitle: {
      type: String,
      required: true,
    },
    jobType: {
      type: String,
      required: true,
    },
    jobVacancies: {
      type: String,
      required: true,
    },
    jobTiming: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      required: true,
    },
    essentialKnowledge: {
      type: String,
      required: true,
    },
    skills: {
      type: [String],
      required: true,
    },
    jobLocation: {
      type: String,
      required: true,
    },
    qualification: {
      type: String,
      required: true,
    },
    salary: {
      type: String,
      required: true,
    },
    experience: {
      type: String,
      required: true,
    },
    deadline: {
      type: Date,
      required: true,
    },
    recruiterId: {
      type: Schema.Types.ObjectId,
      ref: 'Recruiter',
    },
    appliedUsers: [
      {
        type: Schema.Types.ObjectId,
        ref: 'UserProfile',
      },
    ],
  },
  { timestamps: true }
);

export const Job = model('Job', jobSchema);
