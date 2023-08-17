"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepositoryInter = void 0;
const userRepositoryInter = (repository) => {
    const getUserByEmail = async (email) => {
        return repository.getUserByEmail(email);
    };
    const getUserProfileByEmail = async (email) => {
        return await repository.getUserProfileByEmail(email);
    };
    const addUser = async (user, profileId) => {
        return repository.addUser(user, profileId);
    };
    const savingResetToken = async (email, hashedResetPasswordToken, resetPasswordTokenExpires) => {
        const saving = await repository.savingResetToken(email, hashedResetPasswordToken, resetPasswordTokenExpires);
        return saving;
    };
    const getUserByResetToken = async (resetToken) => {
        const user = await repository.getUserByResetToken(resetToken);
        return user;
    };
    const resetPassword = async (resetToken, password) => {
        return await repository.resetPassword(resetToken, password);
    };
    return {
        getUserByEmail,
        addUser,
        getUserProfileByEmail,
        savingResetToken,
        getUserByResetToken,
        resetPassword
    };
};
exports.userRepositoryInter = userRepositoryInter;
