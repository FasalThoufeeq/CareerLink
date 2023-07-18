import { UserProfileRepositoryImpl } from "../../Framework/Database/MongoDB/repositories/userProfileRepositoryImpl";
import { UserProfileInterface } from "../../Types/userProfileInterface";

export const userProfileRepositoryInter = (
  repository: ReturnType<UserProfileRepositoryImpl>
) => {
  const addProfile = async (profileData: UserProfileInterface|any) => {
    return await repository.addProfile(profileData);
  };
  const getProfile = async (profileId: string) => {
    return await repository.getProfile(profileId)
  };

  return {
    addProfile,
    getProfile
  };
};

export type UserProfileRepositoryInter = typeof userProfileRepositoryInter;
