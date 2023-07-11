"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authServiceInter = void 0;
const authServiceInter = (service) => {
    const encryptPassword = (password) => service.encryptPassword(password);
    const comparePassword = (password, hashedPassword) => service.comparePassword(password, hashedPassword);
    const generateToken = (payload) => service.generateToken(payload);
    const verifyToken = (token) => service.verifyToken(token);
    return {
        encryptPassword,
        comparePassword,
        generateToken,
        verifyToken
    };
};
exports.authServiceInter = authServiceInter;
