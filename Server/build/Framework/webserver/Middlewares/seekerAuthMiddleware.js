"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const httpStatus_1 = require("../../../Types/httpStatus");
const AppError_1 = __importDefault(require("../../../Utils/AppError"));
const authServiceInter_1 = require("../../../Application/Services/authServiceInter");
const authServiceImpl_1 = require("../../Services/authServiceImpl");
const service = (0, authServiceInter_1.authServiceInter)((0, authServiceImpl_1.authServiceImpl)());
const seekerAuthMiddleware = (req, res, next) => {
    let token = "";
    if (req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
        throw new AppError_1.default("Token not found", httpStatus_1.HttpStatus.UNAUTHORIZED);
    }
    try {
        console.log('dhskjf');
        const payload = service.verifyToken(token);
        console.log(payload, "ooo");
        next();
    }
    catch (err) {
        throw new AppError_1.default("UnAuthorized User", httpStatus_1.HttpStatus.UNAUTHORIZED);
    }
};
exports.default = seekerAuthMiddleware;
