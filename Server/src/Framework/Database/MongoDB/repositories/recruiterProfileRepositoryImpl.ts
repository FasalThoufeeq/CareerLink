import { recruiterProfileInterface } from "../../../../Types/recruiterProfileInterface";
import { RecruiterProfile } from "../models/recruiterProfileModel";
import { UserProfile } from "../models/userProfileModel";

export const recruiterProfileRepositoryImpl = () => {
  const addRecruiterProfile = async (
    profileData: recruiterProfileInterface
  ) => {
    return await RecruiterProfile.create(profileData);
  };

  const getRecuiterProfile = async (profileId: string) => {
    const Profile = await RecruiterProfile.findById({
      _id: profileId,
    });
    return Profile;
  };

  const getRecuiterProfileByEmail = async (email: string) => {
    const Profile = await RecruiterProfile.findOne({
      email: email,
    });
    return Profile;
  };

  const updateProfile = async (
    updatedProfile: recruiterProfileInterface,
    profileId: string
  ) => {
    const EditedProfile = await RecruiterProfile.findByIdAndUpdate(
      { _id: profileId },
      { $set: updatedProfile },
      { new: true }
    );
    return EditedProfile;
  };

  const updateLogo = async (profileId: string, companylogo: string) => {
    const UpdatedData = await RecruiterProfile.findByIdAndUpdate(
      { _id: profileId },
      { $set: { companylogo: companylogo } },
      { new: true }
    );
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

export type RecruiterProfileRepositoryImpl =
  typeof recruiterProfileRepositoryImpl;
