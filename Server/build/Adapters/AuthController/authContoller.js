"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const auth_1 = require("../../Application/useCases/auth/auth");
const nodemailerInter_1 = require("../../Application/Services/nodemailerInter");
const nodemailerImpl_1 = require("../../Framework/Services/nodemailerImpl");
const authController = (authServiceImpl, authServiceInter, userRepositoryImpl, userRepositoryInter, userProfileRepositoryImpl, userProfileRepositoryInter, recruiterRepositoryImpl, recruiterRepositoryInter, recruiterProfileRepositoryImpl, recruiterProfileRepositoryInter) => {
    const authService = authServiceInter(authServiceImpl());
    const userDbRepository = userRepositoryInter(userRepositoryImpl());
    const userProfileRepository = userProfileRepositoryInter(userProfileRepositoryImpl());
    const nodemailerRepository = (0, nodemailerInter_1.SendEmailInter)((0, nodemailerImpl_1.SendEmailImpl)());
    const recruiterRepository = recruiterRepositoryInter(recruiterRepositoryImpl());
    const recruiterProfileRepository = recruiterProfileRepositoryInter(recruiterProfileRepositoryImpl());
    const registerUser = (0, express_async_handler_1.default)(async (req, res) => {
        const user = req.body;
        const createUser = await (0, auth_1.userRegister)(user, userDbRepository, userProfileRepository, authService);
        res.json({
            status: "success",
            message: "new user registered",
            createUser,
        });
    });
    const loginUser = (0, express_async_handler_1.default)(async (req, res) => {
        const { email, password } = req.body;
        const { token, user, profile } = await (0, auth_1.userLogin)(email, password, userDbRepository, authService);
        res.json({
            status: "success",
            message: "logged in successfully",
            token,
            user,
            profile,
        });
    });
    const googleLoginUser = (0, express_async_handler_1.default)(async (req, res) => {
        const userDetails = req.body;
        const user = {
            firstName: userDetails?._tokenResponse?.firstName,
            lastName: userDetails?._tokenResponse?.lastName,
            email: userDetails?._tokenResponse?.email,
        };
        const { token, isExistingEmail, profile } = await (0, auth_1.userGoogleLogin)(user, userDbRepository, userProfileRepository, authService);
        res.json({
            status: "success",
            message: "Google login successfull",
            token,
            user: isExistingEmail,
            profile
        });
    });
    const registerRecruiter = (0, express_async_handler_1.default)(async (req, res) => {
        const recruiter = req.body;
        const createRecruiter = await (0, auth_1.recruiterRegister)(recruiter, recruiterRepository, recruiterProfileRepository, authService);
        res.json({
            status: "success",
            message: "new recruiter registered",
            createRecruiter,
        });
    });
    const loginRecruiter = (0, express_async_handler_1.default)(async (req, res) => {
        const { email, password } = req.body;
        const { token, recruiter, profile } = await (0, auth_1.RecruiterLogin)(email, password, recruiterRepository, authService, recruiterProfileRepository);
        res.json({
            status: "success",
            message: "logged in successfully",
            token,
            recruiter,
            profile,
        });
    });
    const forgotPassEmail = (0, express_async_handler_1.default)(async (req, res) => {
        const { email } = req.body;
        await (0, auth_1.forgottenpassEmail)(email, authService, userDbRepository, nodemailerRepository);
        res.json({
            status: "success",
            message: "reset password link send to the user email",
        });
    });
    const resetingPassword = (0, express_async_handler_1.default)(async (req, res) => {
        const { resetToken } = req.params;
        const { password } = req.body;
        await (0, auth_1.resetPassword)(resetToken, password, authService, userDbRepository);
        res.json({
            status: "success",
            message: "Your password Reset Successfully",
        });
    });
    const InvitingEmail = (0, express_async_handler_1.default)(async (req, res) => {
        const { name, email, roomId, jobTitle, companyName } = req.body;
        await (0, auth_1.InviteEmail)(name, email, roomId, jobTitle, companyName, nodemailerRepository);
        res.json({
            status: "success",
            message: "Invite Email send Successfully",
        });
    });
    return {
        registerUser,
        loginUser,
        googleLoginUser,
        registerRecruiter,
        loginRecruiter,
        forgotPassEmail,
        resetingPassword,
        InvitingEmail
    };
};
exports.default = authController;
