"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authServiceImpl = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
const crypto_1 = __importDefault(require("crypto"));
const authServiceImpl = () => {
    const encryptPassword = async (password) => {
        const salt = await bcryptjs_1.default.genSalt(10);
        password = await bcryptjs_1.default.hash(password, salt);
        return password;
    };
    const comparePassword = (password, hashedPassword) => {
        return bcryptjs_1.default.compare(password, hashedPassword);
    };
    const generateToken = (payload) => {
        const token = jsonwebtoken_1.default.sign({ userId: payload }, config_1.default.JWT_SECRET_KEY, {
            expiresIn: "5d",
        });
        return token;
    };
    const verifyToken = (token) => {
        return jsonwebtoken_1.default.verify(token, config_1.default.JWT_SECRET_KEY);
    };
    const createResetPasswordToken = async () => {
        const resetToken = await crypto_1.default.randomBytes(32).toString("hex");
        return resetToken;
    };
    const hashResetPasswordToken = async (ResetPasswordToken) => {
        const hashedResetPasswordToken = await crypto_1.default
            .createHash("sha256")
            .update(ResetPasswordToken)
            .digest("hex");
        return hashedResetPasswordToken;
    };
    return {
        encryptPassword,
        comparePassword,
        generateToken,
        verifyToken,
        createResetPasswordToken,
        hashResetPasswordToken,
    };
};
exports.authServiceImpl = authServiceImpl;
