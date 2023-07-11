"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRecruiterJobs = exports.createJob = void 0;
const createJob = async (job, JobRepository) => {
    const addedJob = await JobRepository.addJob(job);
    return addedJob;
};
exports.createJob = createJob;
const getRecruiterJobs = async (recruiterId, JobRepository) => {
    const RecruiterAllJobs = await JobRepository.getRecruiterJobs(recruiterId);
    return RecruiterAllJobs;
};
exports.getRecruiterJobs = getRecruiterJobs;
