import { recruiterProfileInterface } from "../../Types/recruiterProfileInterface";
import { RecruiterProfileRepositoryImpl } from "../../Framework/Database/MongoDB/repositories/recruiterProfileRepositoryImpl";

export const recruiterProfileRepositoryInter = (
  repository: ReturnType<RecruiterProfileRepositoryImpl>
) => {
  const addRecruiterProfile = async (
    profileData: recruiterProfileInterface | any
  ) => {
    return await repository.addRecruiterProfile(profileData);
  };

  const getRecuiterProfile = async (profileId: string) => {
    const Profile = await repository.getRecuiterProfile(profileId);
    return Profile;
  };

  const getRecuiterProfileByEmail = async (email: string) => {
    const Profile = await repository.getRecuiterProfileByEmail(email);
    return Profile;
  };

  const updateProfile = async (
    updatedProfile: recruiterProfileInterface,
    profileId: string
  ) => {
    const EditedProfile = await repository.updateProfile(
      updatedProfile,
      profileId
    );
    return EditedProfile;
  };

  const updateLogo = async (profileId: string, companylogo: string) => {
    const UpdatedData = await repository.updateLogo(profileId,companylogo)
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

export type RecruiterProfileRepositoryInter =
  typeof recruiterProfileRepositoryInter;
