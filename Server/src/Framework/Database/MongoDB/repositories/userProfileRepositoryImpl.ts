import { UserProfileInterface } from "../../../../Types/userProfileInterface";
import { UserProfile } from "../models/userProfileModel";

export const userProfileRepositoryImpl = () => {
  const addProfile = async (profileData: UserProfileInterface) => {
    return await UserProfile.create(profileData);
  };

  const getProfile = async (profileId: string) => {
    return await UserProfile.findById(profileId);
  };

  return {
    addProfile,
    getProfile
  };
};

export type UserProfileRepositoryImpl = typeof userProfileRepositoryImpl;
