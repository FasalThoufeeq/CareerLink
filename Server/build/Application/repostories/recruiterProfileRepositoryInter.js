"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recruiterProfileRepositoryInter = void 0;
const recruiterProfileRepositoryInter = (repository) => {
    const addRecruiterProfile = async (profileData) => {
        return await repository.addRecruiterProfile(profileData);
    };
    const getRecuiterProfile = async (profileId) => {
        const Profile = await repository.getRecuiterProfile(profileId);
        return Profile;
    };
    const getRecuiterProfileByEmail = async (email) => {
        const Profile = await repository.getRecuiterProfileByEmail(email);
        return Profile;
    };
    const updateProfile = async (updatedProfile, profileId) => {
        const EditedProfile = await repository.updateProfile(updatedProfile, profileId);
        return EditedProfile;
    };
    const updateLogo = async (profileId, companylogo) => {
        const UpdatedData = await repository.updateLogo(profileId, companylogo);
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
exports.recruiterProfileRepositoryInter = recruiterProfileRepositoryInter;
