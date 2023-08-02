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
    const getAllJobs = async () => await repository.getAllJobs();
    const ApplyJob = async (jobId, applicantId) => await repository.ApplyJob(jobId, applicantId);
    const getCandidates = async (jobId) => {
        return await repository.getCandidates(jobId);
    };
    const changeStatus = async (jobId, applicantId, status) => {
        const updatedProfile = await repository.changeStatus(jobId, applicantId, status);
        return updatedProfile;
    };
    const getAppliedJobs = async (profileId) => {
        const profile = await repository.getAppliedJobs(profileId);
        return profile;
    };
    const cancelJob = async (jobId, applicantId) => {
        await repository.cancelJob(jobId, applicantId);
    };
    const EditJobs = async (EditedDetails, jobId) => {
        const jobDetails = await repository.EditJobs(EditedDetails, jobId);
        return jobDetails;
    };
    const FetchJob = async (jobId) => {
        const jobDetails = await repository.FetchJob(jobId);
        return jobDetails;
    };
    return {
        addJob,
        getRecruiterJobs,
        getAllJobs,
        ApplyJob,
        getCandidates,
        changeStatus,
        getAppliedJobs,
        cancelJob,
        EditJobs,
        FetchJob
    };
};
exports.jobRepositoryInter = jobRepositoryInter;
