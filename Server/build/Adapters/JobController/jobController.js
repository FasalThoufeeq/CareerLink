"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const job_1 = require("../../Application/useCases/job/job");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const jobController = (jobRepositoryImpl, jobRepositoryInter) => {
    const jobRepository = jobRepositoryInter(jobRepositoryImpl());
    const postJob = (0, express_async_handler_1.default)(async (req, res) => {
        const jobDetails = req.body;
        const postedJob = await (0, job_1.createJob)(jobDetails, jobRepository);
        res.json({
            postedJob,
            status: "success",
            message: "new job created",
        });
    });
    const RecruiterAllJobs = (0, express_async_handler_1.default)(async (req, res) => {
        const { recruiterId } = req.params;
        const RecruiterJobs = await (0, job_1.getRecruiterJobs)(recruiterId, jobRepository);
        res.json({
            RecruiterJobs,
            status: "success",
            message: "jobs fetched successfully",
        });
    });
    const GetAppliedCandidates = (0, express_async_handler_1.default)(async (req, res) => {
        const { jobId } = req.params;
        const Candidates = await (0, job_1.getCandidates)(jobId, jobRepository);
        res.json({
            Candidates,
            status: "success",
            message: "fetched candidates successfully",
        });
    });
    const StatusChange = (0, express_async_handler_1.default)(async (req, res) => {
        const { jobId, applicantId, status } = req.query;
        const updatedProfile = await (0, job_1.changeStatus)(jobId?.toString() || "", applicantId?.toString() || "", status?.toString() || "", jobRepository);
        res.json({
            status: "success",
            message: "status updated successfully",
            updatedProfile,
        });
    });
    const EdittingJob = (0, express_async_handler_1.default)(async (req, res) => {
        const { jobId } = req.params;
        const EditedDetails = req.body;
        const jobDetails = await (0, job_1.EditJobs)(EditedDetails, jobId, jobRepository);
        res.json({
            status: "success",
            message: "Job Edited Successfully",
            jobDetails,
        });
    });
    const FetchingJob = (0, express_async_handler_1.default)(async (req, res) => {
        const { jobId } = req.params;
        const jobDetails = await (0, job_1.FetchJob)(jobId, jobRepository);
        res.json({
            status: "success",
            message: "Job Fetched Successfully",
            jobDetails,
        });
    });
    const pushingNotification = (0, express_async_handler_1.default)(async (req, res) => {
        const { applicantId, notification, notificationSummary } = req.body;
        await (0, job_1.PushNotification)(applicantId, notification, notificationSummary, jobRepository);
        res.json({
            status: "success",
            message: "notification successfully pushed",
        });
    });
    return {
        postJob,
        RecruiterAllJobs,
        GetAppliedCandidates,
        StatusChange,
        EdittingJob,
        FetchingJob,
        pushingNotification,
    };
};
exports.default = jobController;
