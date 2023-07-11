"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jobController_1 = __importDefault(require("../../../Adapters/JobController/jobController"));
const jobRepositoryImpl_1 = require("../../Database/MongoDB/repositories/jobRepositoryImpl");
const jobRepositoryInter_1 = require("../../../Application/repostories/jobRepositoryInter");
const recruiterRoute = () => {
    const router = express_1.default.Router();
    const controller = (0, jobController_1.default)(jobRepositoryImpl_1.jobRepositoryImp, jobRepositoryInter_1.jobRepositoryInter);
    router.post("/post_jobs", controller.postJob);
    router.get('/get_jobs/:recruiterId', controller.RecruiterAllJobs);
    return router;
};
exports.default = recruiterRoute;
