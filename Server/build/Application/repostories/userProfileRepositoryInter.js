"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userProfileRepositoryInter = void 0;
const userProfileRepositoryInter = (repository) => {
    const addProfile = async (profileData) => {
        return await repository.addProfile(profileData);
    };
    const getProfile = async (profileId) => {
        return await repository.getProfile(profileId);
    };
    const updateProfile = async (profileId, updatedProfile) => {
        const EditedProfile = await repository.updateProfile(profileId, updatedProfile);
        return EditedProfile;
    };
    const updateProfilePic = async (profileId, profilePic) => {
        const UpdatedData = await repository.updateProfilePic(profileId, profilePic);
        return UpdatedData;
    };
    return {
        updateProfile,
        addProfile,
        getProfile,
        updateProfilePic
    };
};
exports.userProfileRepositoryInter = userProfileRepositoryInter;
