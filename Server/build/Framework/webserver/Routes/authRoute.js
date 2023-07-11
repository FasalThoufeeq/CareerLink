"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authContoller_1 = __importDefault(require("../../../Adapters/AuthController/authContoller"));
const userRepositoryImpl_1 = require("../../Database/MongoDB/repositories/userRepositoryImpl");
const userRepositoryInter_1 = require("../../../Application/repostories/userRepositoryInter");
const authServiceImpl_1 = require("../../Services/authServiceImpl");
const authServiceInter_1 = require("../../../Application/Services/authServiceInter");
const recruiterRepositoryInter_1 = require("../../../Application/repostories/recruiterRepositoryInter");
const recruiterRepositoryImpl_1 = require("../../Database/MongoDB/repositories/recruiterRepositoryImpl");
const authRoute = () => {
    const router = express_1.default.Router();
    const controller = (0, authContoller_1.default)(authServiceImpl_1.authServiceImpl, authServiceInter_1.authServiceInter, userRepositoryImpl_1.userRepositoryImpl, userRepositoryInter_1.userRepositoryInter, recruiterRepositoryImpl_1.recruiterRepositoryImpl, recruiterRepositoryInter_1.recruiterRepositoryInter);
    console.log('lllll');
    router.post('/signup', controller.registerUser);
    router.post('/login', controller.loginUser);
    router.post('/google-login', controller.googleLoginUser);
    router.post('/recruiter/signup', controller.registerRecruiter);
    router.post('/recruiter/login', controller.loginRecruiter);
    return router;
};
exports.default = authRoute;
