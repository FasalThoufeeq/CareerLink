"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jobController_1 = __importDefault(require("../../../Adapters/JobController/jobController"));
const jobRepositoryImpl_1 = require("../../Database/MongoDB/repositories/jobRepositoryImpl");
const jobRepositoryInter_1 = require("../../../Application/repostories/jobRepositoryInter");
const recruiterController_1 = __importDefault(require("../../../Adapters/RecruiterController/recruiterController"));
const recruiterProfileRepositoryImpl_1 = require("../../Database/MongoDB/repositories/recruiterProfileRepositoryImpl");
const recruiterProfileRepositoryInter_1 = require("../../../Application/repostories/recruiterProfileRepositoryInter");
const cloudinary_1 = require("../Middlewares/cloudinary");
const recruiterRoute = () => {
    const router = express_1.default.Router();
    const controller = (0, jobController_1.default)(jobRepositoryImpl_1.jobRepositoryImp, jobRepositoryInter_1.jobRepositoryInter);
    const profileController = (0, recruiterController_1.default)(recruiterProfileRepositoryImpl_1.recruiterProfileRepositoryImpl, recruiterProfileRepositoryInter_1.recruiterProfileRepositoryInter);
    router.post("/post_jobs", controller.postJob);
    router.get("/get_jobs/:recruiterId", controller.RecruiterAllJobs);
    router.get("/applied_candidates/:jobId", controller.GetAppliedCandidates);
    router.post("/change_status", controller.StatusChange);
    router.get("/get_profile/:profileId", profileController.GettingProfile);
    router.put("/update_profile/:profileId", profileController.UpdatingProfile);
    router.put("/update_companylogo/:profileId", cloudinary_1.uploadCompanylogo, profileController.UpdatingCompanylogo);
    router.put("/edit_jobs/:jobId", controller.EdittingJob);
    router.get("/get_job/:jobId", controller.FetchingJob);
    return router;
};
exports.default = recruiterRoute;
