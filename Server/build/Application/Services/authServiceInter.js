"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authServiceInter = void 0;
const authServiceInter = (service) => {
    const encryptPassword = (password) => service.encryptPassword(password);
    const comparePassword = (password, hashedPassword) => service.comparePassword(password, hashedPassword);
    const generateToken = (payload) => service.generateToken(payload);
    const verifyToken = (token) => service.verifyToken(token);
    const createResetPasswordToken = async () => {
        const resetToken = await service.createResetPasswordToken();
        return resetToken;
    };
    const hashResetPasswordToken = async (ResetPasswordToken) => {
        const hashedResetPasswordToken = await service.hashResetPasswordToken(ResetPasswordToken);
        return hashedResetPasswordToken;
    };
    return {
        encryptPassword,
        comparePassword,
        generateToken,
        verifyToken,
        createResetPasswordToken,
        hashResetPasswordToken
    };
};
exports.authServiceInter = authServiceInter;
