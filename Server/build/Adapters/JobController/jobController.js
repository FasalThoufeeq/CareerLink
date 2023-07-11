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
        console.log(jobDetails);
        const postedJob = await (0, job_1.createJob)(jobDetails, jobRepository);
        res.json({
            postedJob,
            status: "success",
            message: "new job created",
        });
    });
    const RecruiterAllJobs = (0, express_async_handler_1.default)(async (req, res) => {
        const { recruiterId } = req.params;
        // console.log(recruiterId);
        const RecruiterJobs = await (0, job_1.getRecruiterJobs)(recruiterId, jobRepository);
        res.json({
            RecruiterJobs,
            status: "success",
            message: "jobs fetched successfully",
        });
    });
    return {
        postJob,
        RecruiterAllJobs
    };
};
exports.default = jobController;
