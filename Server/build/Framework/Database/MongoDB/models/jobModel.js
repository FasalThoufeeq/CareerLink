"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Job = void 0;
const mongoose_1 = require("mongoose");
const jobSchema = new mongoose_1.Schema({
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
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Recruiter',
    },
    appliedUsers: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'UserProfile',
        },
    ],
}, { timestamps: true });
exports.Job = (0, mongoose_1.model)('Job', jobSchema);
