"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recruiterRepositoryInter = void 0;
const recruiterRepositoryInter = (repository) => {
    const getRecruiterByEmail = async (email) => {
        return repository.getRecruiterByEmail(email);
    };
    const getRecruiterByUsername = (userName) => {
        return repository.getRecruiterByUsername(userName);
    };
    const addRecruiter = (recruiter, profileId) => {
        return repository.addRecruiter(recruiter, profileId);
    };
    return {
        getRecruiterByEmail,
        addRecruiter,
        getRecruiterByUsername
    };
};
exports.recruiterRepositoryInter = recruiterRepositoryInter;
