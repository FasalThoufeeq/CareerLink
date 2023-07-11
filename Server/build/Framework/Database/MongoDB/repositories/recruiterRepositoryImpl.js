"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recruiterRepositoryImpl = void 0;
const recruiterModel_1 = require("../models/recruiterModel");
const recruiterRepositoryImpl = () => {
    const getRecruiterByEmail = async (email) => {
        const recruiter = await recruiterModel_1.Recruiter.findOne({
            email: email,
        });
        return recruiter;
    };
    const getRecruiterByUsername = async (userName) => {
        const recruiter = await recruiterModel_1.Recruiter.findOne({
            userName: userName,
        });
        return recruiter;
    };
    const addRecruiter = async (recruiter) => {
        const newRecruiter = new recruiterModel_1.Recruiter(recruiter);
        const savedRecuiter = await newRecruiter.save();
        return savedRecuiter;
    };
    return {
        getRecruiterByEmail,
        addRecruiter,
        getRecruiterByUsername
    };
};
exports.recruiterRepositoryImpl = recruiterRepositoryImpl;
