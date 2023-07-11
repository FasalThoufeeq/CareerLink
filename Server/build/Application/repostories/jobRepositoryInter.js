"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jobRepositoryInter = void 0;
const jobRepositoryInter = (repository) => {
    const addJob = async (job) => {
        return await repository.addJob(job);
    };
    const getRecruiterJobs = async (recruiterId) => {
        return await repository.getRecruiterJobs(recruiterId);
    };
    return {
        addJob,
        getRecruiterJobs
    };
};
exports.jobRepositoryInter = jobRepositoryInter;
