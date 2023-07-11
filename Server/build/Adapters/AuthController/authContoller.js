"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const auth_1 = require("../../Application/useCases/auth/auth");
const authController = (authServiceImpl, authServiceInter, userRepositoryImpl, userRepositoryInter, recruiterRepositoryImpl, recruiterRepositoryInter) => {
    console.log("eeeee");
    const authService = authServiceInter(authServiceImpl());
    const userDbRepository = userRepositoryInter(userRepositoryImpl());
    const recruiterRepository = recruiterRepositoryInter(recruiterRepositoryImpl());
    const registerUser = (0, express_async_handler_1.default)(async (req, res) => {
        console.log("kkkk");
        const user = req.body;
        console.log(req.body);
        const createUser = await (0, auth_1.userRegister)(user, userDbRepository, authService);
        console.log(createUser, "varum");
        res.json({
            status: "success",
            message: "new user registered",
            createUser,
        });
    });
    const loginUser = (0, express_async_handler_1.default)(async (req, res) => {
        const { email, password } = req.body;
        const { token, user } = await (0, auth_1.userLogin)(email, password, userDbRepository, authService);
        console.log(user, "login");
        res.json({
            status: "success",
            message: "logged in successfully",
            token,
            user,
        });
    });
    const googleLoginUser = (0, express_async_handler_1.default)(async (req, res) => {
        const userDetails = req.body;
        const user = {
            firstName: userDetails?._tokenResponse?.firstName,
            lastName: userDetails?._tokenResponse?.lastName,
            email: userDetails?._tokenResponse?.email,
        };
        const { token, isExistingEmail } = await (0, auth_1.userGoogleLogin)(user, userDbRepository, authService);
        res.json({
            status: "success",
            message: "Google login successfull",
            token,
            user: isExistingEmail,
        });
    });
    const registerRecruiter = (0, express_async_handler_1.default)(async (req, res) => {
        const recruiter = req.body;
        const createRecruiter = await (0, auth_1.recruiterRegister)(recruiter, recruiterRepository, authService);
        res.json({
            status: "success",
            message: "new recruiter registered",
            createRecruiter,
        });
    });
    const loginRecruiter = (0, express_async_handler_1.default)(async (req, res) => {
        const { email, password } = req.body;
        const { token, recruiter } = await (0, auth_1.RecruiterLogin)(email, password, recruiterRepository, authService);
        console.log(recruiter, "login");
        res.json({
            status: "success",
            message: "logged in successfully",
            token,
            recruiter,
        });
    });
    return {
        registerUser,
        loginUser,
        googleLoginUser,
        registerRecruiter,
        loginRecruiter,
    };
};
exports.default = authController;
