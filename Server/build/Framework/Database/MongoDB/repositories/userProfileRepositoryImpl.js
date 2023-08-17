"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userProfileRepositoryImpl = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const userProfileModel_1 = require("../models/userProfileModel");
const userProfileRepositoryImpl = () => {
    const addProfile = async (profileData) => {
        return await userProfileModel_1.UserProfile.create(profileData);
    };
    const getProfile = async (profileId) => {
        return await userProfileModel_1.UserProfile.findById(profileId);
    };
    const updateProfile = async (profileId, updatedProfile) => {
        const EditedProfile = await userProfileModel_1.UserProfile.findByIdAndUpdate({ _id: profileId }, { $set: updatedProfile }, { new: true });
        await userModel_1.default.findOneAndUpdate({ profileId: profileId }, {
            $set: {
                email: updatedProfile.email,
                firstName: updatedProfile.firstName,
                lastName: updatedProfile.lastName,
                phoneNumber: updatedProfile.phoneNumber,
            },
        }, { new: true });
        return EditedProfile;
    };
    const updateProfilePic = async (profileId, profilePic) => {
        const UpdatedData = await userProfileModel_1.UserProfile.findByIdAndUpdate({ _id: profileId }, { $set: { profilePicture: profilePic } }, { new: true });
        return UpdatedData;
    };
    return {
        addProfile,
        getProfile,
        updateProfile,
        updateProfilePic,
    };
};
exports.userProfileRepositoryImpl = userProfileRepositoryImpl;
