"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jobRepositoryImp = void 0;
const jobModel_1 = require("../models/jobModel");
const jobRepositoryImp = () => {
    const addJob = async (job) => {
        const newJob = new jobModel_1.Job(job);
        const savedJob = await newJob.save();
        return savedJob;
    };
    const getRecruiterJobs = async (recruiterId) => {
        const recruiterJobs = await jobModel_1.Job.find({ recruiterId: recruiterId });
        return recruiterJobs;
    };
    return {
        addJob,
        getRecruiterJobs
    };
};
exports.jobRepositoryImp = jobRepositoryImp;
