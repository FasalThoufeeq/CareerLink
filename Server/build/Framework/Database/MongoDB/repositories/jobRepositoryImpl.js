"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jobRepositoryImp = void 0;
const jobModel_1 = require("../models/jobModel");
const userProfileModel_1 = require("../models/userProfileModel");
const AppError_1 = __importDefault(require("../../../../Utils/AppError"));
const httpStatus_1 = require("../../../../Types/httpStatus");
const jobRepositoryImp = () => {
    const addJob = async (job) => {
        const newJob = new jobModel_1.Job(job);
        const savedJob = await newJob.save();
        return savedJob;
    };
    const getRecruiterJobs = async (recruiterId) => {
        const recruiterJobs = await jobModel_1.Job.find({ recruiterId: recruiterId })
            .sort({
            createdAt: -1,
        })
            .populate("recruiterId");
        return recruiterJobs;
    };
    const getAllJobs = async () => {
        const jobList = await jobModel_1.Job.find()
            .sort({ createdAt: -1 })
            .populate("recruiterId");
        return jobList;
    };
    const ApplyJob = async (jobId, applicantId) => {
        console.log(jobId, applicantId, "ooo");
        const userProfile = await userProfileModel_1.UserProfile.findOne({ _id: applicantId });
        console.log(userProfile, "iiiii");
        const job = await jobModel_1.Job.findById(jobId);
        if (!userProfile || !job) {
            throw new AppError_1.default("Invalid job or user profile", httpStatus_1.HttpStatus.BAD_REQUEST);
        }
        const appliedJobs = userProfile.appliedJobs;
        const jobExist = appliedJobs.some((appliedJob) => appliedJob._id == jobId);
        if (!jobExist) {
            appliedJobs.push({ _id: jobId.toString(), status: "pending" });
        }
        const applicants = job.appliedUsers;
        if (!applicants.includes(applicantId)) {
            applicants.push(applicantId);
            job.appliedUsers = applicants;
        }
        return await Promise.all([job.save(), userProfile.save()]).then((result) => {
            return result;
        });
    };
    const getCandidates = async (jobId) => {
        const appliedCandidates = await jobModel_1.Job.findById(jobId).populate("appliedUsers");
        console.log(appliedCandidates, "wonder");
        return appliedCandidates;
    };
    const changeStatus = async (jobId, applicantId, status) => {
        const userprofile = await userProfileModel_1.UserProfile.findById(applicantId);
        if (!userprofile) {
            return;
        }
        const appliedJob = userprofile.appliedJobs.find((job) => job._id?.toString() == jobId);
        if (!appliedJob) {
            return;
        }
        appliedJob.status = status;
        const updatedProfile = await userprofile.save();
        return updatedProfile;
    };
    const getAppliedJobs = async (profileId) => {
        const profile = await userProfileModel_1.UserProfile.findById(profileId).populate("appliedJobs._id");
        return profile;
    };
    const cancelJob = async (jobId, applicantId) => {
        const updateInUserProfile = await userProfileModel_1.UserProfile.updateOne({ _id: applicantId }, { $pull: { appliedJobs: { _id: jobId } } });
        const updateInJob = await jobModel_1.Job.updateOne({ _id: jobId }, { $pull: { appliedUsers: applicantId } });
        console.log(updateInJob, "job");
        console.log(updateInUserProfile, "profile");
    };
    const EditJobs = async (EditedDetails, jobId) => {
        const jobDetails = await jobModel_1.Job.findByIdAndUpdate({ _id: jobId }, { $set: EditedDetails }, { new: true });
        return jobDetails;
    };
    const FetchJob = async (jobId) => {
        const jobDetails = await jobModel_1.Job.findOne({ _id: jobId });
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
        FetchJob,
    };
};
exports.jobRepositoryImp = jobRepositoryImp;
