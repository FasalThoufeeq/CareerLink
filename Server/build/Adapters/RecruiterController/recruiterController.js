"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const auth_1 = require("../../Application/useCases/auth/auth");
const RecruiterProfileController = (recruiterProfileRepositoryImpl, recruiterProfileRepositoryInter) => {
    const recruiterProfileRepository = recruiterProfileRepositoryInter(recruiterProfileRepositoryImpl());
    const GettingProfile = (0, express_async_handler_1.default)(async (req, res) => {
        const { profileId } = req.params;
        const profile = await (0, auth_1.getRecruiterProfile)(profileId, recruiterProfileRepository);
        res.json({
            status: "success",
            message: "Recruiter Profile fetched Successfully",
            profile,
        });
    });
    const UpdatingProfile = (0, express_async_handler_1.default)(async (req, res) => {
        const { profileId } = req.params;
        const updatedProfile = req.body;
        console.log(profileId, updatedProfile, "wwwe");
        const EditedProfile = await (0, auth_1.UpdateRecruiterProfile)(updatedProfile, profileId, recruiterProfileRepository);
        res.json({
            status: "success",
            message: "Profile updated successfully",
            EditedProfile,
        });
    });
    const UpdatingCompanylogo = (0, express_async_handler_1.default)(async (req, res) => {
        const { profileId } = req.params;
        const companylogo = req?.file?.path;
        const EditedProfile = await (0, auth_1.UpdateCompanylogo)(profileId, companylogo, recruiterProfileRepository);
        res.json({
            status: "success",
            message: "CompanyLogo updated successfully",
            EditedProfile,
        });
    });
    return { GettingProfile, UpdatingProfile, UpdatingCompanylogo };
};
exports.default = RecruiterProfileController;
