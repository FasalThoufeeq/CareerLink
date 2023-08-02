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
    return {
        getUserByEmail,
        addUser,
        getUserProfileByEmail
    };
};
exports.userRepositoryInter = userRepositoryInter;
