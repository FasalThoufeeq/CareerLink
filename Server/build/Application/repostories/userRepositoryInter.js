"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepositoryInter = void 0;
const userRepositoryInter = (repository) => {
    const getUserByEmail = async (email) => {
        return repository.getUserByEmail(email);
    };
    const addUser = async (user) => {
        return repository.addUser(user);
    };
    return {
        getUserByEmail,
        addUser,
    };
};
exports.userRepositoryInter = userRepositoryInter;
