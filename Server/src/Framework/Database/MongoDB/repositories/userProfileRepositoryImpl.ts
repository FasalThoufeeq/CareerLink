import { UserProfileInterface } from "../../../../Types/userProfileInterface";
import User from "../models/userModel";
import { UserProfile } from "../models/userProfileModel";

export const userProfileRepositoryImpl = () => {
  const addProfile = async (profileData: UserProfileInterface) => {
    return await UserProfile.create(profileData);
  };

  const getProfile = async (profileId: string) => {
    return await UserProfile.findById(profileId);
  };

  const updateProfile = async (
    profileId: string,
    updatedProfile: UserProfileInterface
  ) => {
    const EditedProfile: UserProfileInterface | null =
      await UserProfile.findByIdAndUpdate(
        { _id: profileId },
        { $set: updatedProfile },
        { new: true }
      );
    console.log("klklkl");
    await User.findOneAndUpdate(
      { profileId: profileId },
      {
        $set: {
          email: updatedProfile.email,
          firstName: updatedProfile.firstName,
          lastName: updatedProfile.lastName,
          phoneNumber: updatedProfile.phoneNumber,
        },
      },
      { new: true }
    );
    return EditedProfile;
  };

  const updateProfilePic = async (profileId: string, profilePic: string) => {
    const UpdatedData = await UserProfile.findByIdAndUpdate(
      { _id: profileId },
      { $set: { profilePicture: profilePic } },
      { new: true }
    );
    return UpdatedData;
  };

  return {
    addProfile,
    getProfile,
    updateProfile,
    updateProfilePic,
  };
};

export type UserProfileRepositoryImpl = typeof userProfileRepositoryImpl;
