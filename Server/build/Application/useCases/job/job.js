"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PushNotification = exports.FetchJob = exports.EditJobs = exports.cancelJob = exports.changeStatus = exports.getAppliedJobs = exports.getCandidates = exports.ApplyJob = exports.AllJobs = exports.getRecruiterJobs = exports.createJob = void 0;
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
const AllJobs = async (JobRepository) => {
    const allJobs = await JobRepository.getAllJobs();
    return allJobs;
};
exports.AllJobs = AllJobs;
const ApplyJob = async (jobId, applicantId, jobRepository) => {
    const ApplyJob = await jobRepository.ApplyJob(jobId, applicantId);
    return ApplyJob;
};
exports.ApplyJob = ApplyJob;
const getCandidates = async (JobId, jobRepository) => {
    const getCandidates = await jobRepository.getCandidates(JobId);
    return getCandidates;
};
exports.getCandidates = getCandidates;
const getAppliedJobs = async (profileId, jobRepository) => {
    const profile = await jobRepository.getAppliedJobs(profileId);
    return profile;
};
exports.getAppliedJobs = getAppliedJobs;
const changeStatus = async (jobId, applicantId, status, jobRepository) => {
    const updatedProfile = await jobRepository.changeStatus(jobId, applicantId, status);
};
exports.changeStatus = changeStatus;
const cancelJob = async (jobId, applicantId, jobRepository) => {
    await jobRepository.cancelJob(jobId, applicantId);
};
exports.cancelJob = cancelJob;
const EditJobs = async (EditedDetails, jobId, jobRepository) => {
    const jobDetails = await jobRepository.EditJobs(EditedDetails, jobId);
    return jobDetails;
};
exports.EditJobs = EditJobs;
const FetchJob = async (jobId, jobRepository) => {
    const jobDetails = await jobRepository.FetchJob(jobId);
    return jobDetails;
};
exports.FetchJob = FetchJob;
const PushNotification = async (applicantId, notification, notificationSummary, jobRepository) => {
    await jobRepository.pushNotification(applicantId, notification, notificationSummary);
    return;
};
exports.PushNotification = PushNotification;
