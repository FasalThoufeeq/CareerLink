import { UserProfileRepositoryImpl } from "../../Framework/Database/MongoDB/repositories/userProfileRepositoryImpl";
import { UserProfileInterface } from "../../Types/userProfileInterface";

export const userProfileRepositoryInter = (
  repository: ReturnType<UserProfileRepositoryImpl>
) => {
  const addProfile = async (profileData: UserProfileInterface | any) => {
    return await repository.addProfile(profileData);
  };
  const getProfile = async (profileId: string) => {
    return await repository.getProfile(profileId);
  };
  const updateProfile = async (
    profileId: string,
    updatedProfile: UserProfileInterface
  ) => {
    const EditedProfile: UserProfileInterface | null =
      await repository.updateProfile(profileId, updatedProfile);
    return EditedProfile;
  };
  const updateProfilePic = async (profileId: string, profilePic: string) => {
    const UpdatedData = await repository.updateProfilePic(
      profileId,
      profilePic
    );
    return UpdatedData;
  };

  return {
    updateProfile,
    addProfile,
    getProfile,
    updateProfilePic
  };
};

export type UserProfileRepositoryInter = typeof userProfileRepositoryInter;
