"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recruiterProfileRepositoryImpl = void 0;
const recruiterProfileModel_1 = require("../models/recruiterProfileModel");
const recruiterProfileRepositoryImpl = () => {
    const addRecruiterProfile = async (profileData) => {
        return await recruiterProfileModel_1.RecruiterProfile.create(profileData);
    };
    const getRecuiterProfile = async (profileId) => {
        const Profile = await recruiterProfileModel_1.RecruiterProfile.findById({
            _id: profileId,
        });
        return Profile;
    };
    const getRecuiterProfileByEmail = async (email) => {
        const Profile = await recruiterProfileModel_1.RecruiterProfile.findOne({
            email: email,
        });
        return Profile;
    };
    const updateProfile = async (updatedProfile, profileId) => {
        console.log(updatedProfile, '..............');
        console.log(updatedProfile);
        const EditedProfile = await recruiterProfileModel_1.RecruiterProfile.findByIdAndUpdate({ _id: profileId }, { $set: updatedProfile }, { new: true });
        return EditedProfile;
    };
    const updateLogo = async (profileId, companylogo) => {
        const UpdatedData = await recruiterProfileModel_1.RecruiterProfile.findByIdAndUpdate({ _id: profileId }, { $set: { companylogo: companylogo } }, { new: true });
        return UpdatedData;
    };
    return {
        addRecruiterProfile,
        getRecuiterProfile,
        getRecuiterProfileByEmail,
        updateProfile,
        updateLogo
    };
};
exports.recruiterProfileRepositoryImpl = recruiterProfileRepositoryImpl;
