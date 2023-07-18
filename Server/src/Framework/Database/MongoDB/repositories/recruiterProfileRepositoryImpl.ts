import { recruiterProfileInterface } from "../../../../Types/recruiterProfileInterface";
import { RecruiterProfile } from "../models/recruiterProfileModel";

export const recruiterProfileRepositoryImpl = () => {
  const addRecruiterProfile = async (
    profileData: recruiterProfileInterface
  ) => {
    return await RecruiterProfile.create(profileData);
  };

  return {
    addRecruiterProfile,
  };
};


export type RecruiterProfileRepositoryImpl=typeof recruiterProfileRepositoryImpl