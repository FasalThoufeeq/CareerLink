"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const job_1 = require("../../Application/useCases/job/job");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const auth_1 = require("../../Application/useCases/auth/auth");
const seekerController = (jobRepositoryImp, jobRepositoryInter, userProfileRepositoryImpl, userProfileRepositoryInter) => {
    const userProfileRepository = userProfileRepositoryInter(userProfileRepositoryImpl());
    const jobRepository = jobRepositoryInter(jobRepositoryImp());
    const getAllJobs = (0, express_async_handler_1.default)(async (req, res) => {
        const jobs = await (0, job_1.AllJobs)(jobRepository);
        res.json({
            status: "success",
            message: "jobs fetched successfully",
            jobs,
        });
    });
    const JobApply = (0, express_async_handler_1.default)(async (req, res) => {
        const { applicantId } = req.query;
        const { jobId } = req.query;
        const jobApply = await (0, job_1.ApplyJob)(jobId, applicantId, jobRepository);
        res.json({
            jobApply,
            status: "success",
            message: "job applied successfully",
        });
    });
    const GetSeekerProfile = (0, express_async_handler_1.default)(async (req, res) => {
        const { profileId } = req.params;
        const profile = await (0, auth_1.getProfile)(profileId, userProfileRepository);
        res.json({
            status: "success",
            message: "user profile fetched successfully",
            profile,
        });
    });
    const AppliedJob = (0, express_async_handler_1.default)(async (req, res) => {
        const { profileId } = req.params;
        const profile = await (0, job_1.getAppliedJobs)(profileId, jobRepository);
        res.json({
            status: "success",
            message: "applied jobs fetched successfully",
            profile,
        });
    });
    const JobAppliedCancel = (0, express_async_handler_1.default)(async (req, res) => {
        const { jobId, applicantId } = req.query;
        await (0, job_1.cancelJob)(jobId?.toString() || "", applicantId?.toString() || "", jobRepository);
        res.json({
            status: "success",
            meassage: "Successfully Job Removed From Apllied list",
        });
    });
    const UpdatingProfile = (0, express_async_handler_1.default)(async (req, res) => {
        const { profileId } = req.params;
        const resume = req?.file?.path;
        console.log(resume, "hhhh");
        const profile = req.body;
        console.log(profile);
        const EditedProfile = await (0, auth_1.UpdateProfile)(profileId, profile, resume, userProfileRepository);
        res.json({
            status: "success",
            message: "Profile updated successfully",
            EditedProfile,
        });
    });
    const UpdatingProfilePic = (0, express_async_handler_1.default)(async (req, res) => {
        const { profileId } = req.params;
        const profilePic = req?.file?.path;
        console.log(profilePic, "hhhh");
        console.log(profileId, "hhhh");
        const EditedData = await (0, auth_1.UpdateProfilepic)(profileId, profilePic, userProfileRepository);
        res.json({
            status: "success",
            message: "Profile Pic updated successfully",
            EditedData,
        });
    });
    return {
        getAllJobs,
        JobApply,
        GetSeekerProfile,
        AppliedJob,
        JobAppliedCancel,
        UpdatingProfile,
        UpdatingProfilePic,
    };
};
exports.default = seekerController;
