"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const seekerController_1 = __importDefault(require("../../../Adapters/SeekerController/seekerController"));
const jobRepositoryImpl_1 = require("../../Database/MongoDB/repositories/jobRepositoryImpl");
const jobRepositoryInter_1 = require("../../../Application/repostories/jobRepositoryInter");
const userProfileRepositoryImpl_1 = require("../../Database/MongoDB/repositories/userProfileRepositoryImpl");
const userProfileRepositoryInter_1 = require("../../../Application/repostories/userProfileRepositoryInter");
const cloudinary_1 = __importStar(require("../Middlewares/cloudinary"));
const seekerAuthMiddleware_1 = __importDefault(require("../Middlewares/seekerAuthMiddleware"));
const seekerRoute = () => {
    const router = express_1.default.Router();
    const controller = (0, seekerController_1.default)(jobRepositoryImpl_1.jobRepositoryImp, jobRepositoryInter_1.jobRepositoryInter, userProfileRepositoryImpl_1.userProfileRepositoryImpl, userProfileRepositoryInter_1.userProfileRepositoryInter);
    router.get("/all_jobs", controller.getAllJobs);
    router.post("/apply_job", seekerAuthMiddleware_1.default, controller.JobApply);
    router.get("/seeker_profile/:profileId", controller.GetSeekerProfile);
    router.get("/applied_jobs/:profileId", seekerAuthMiddleware_1.default, controller.AppliedJob);
    router.put("/cancel_job", seekerAuthMiddleware_1.default, controller.JobAppliedCancel);
    router.put("/update_profile/:profileId", seekerAuthMiddleware_1.default, cloudinary_1.default, controller.UpdatingProfile);
    router.put("/update_profilePic/:profileId", seekerAuthMiddleware_1.default, cloudinary_1.uploadprofile, controller.UpdatingProfilePic);
    return router;
};
exports.default = seekerRoute;
