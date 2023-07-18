import { recruiterProfileInterface } from "../../Types/recruiterProfileInterface";
import { RecruiterProfileRepositoryImpl } from "../../Framework/Database/MongoDB/repositories/recruiterProfileRepositoryImpl";

export const recruiterProfileRepositoryInter = (
  repository: ReturnType<RecruiterProfileRepositoryImpl>
) => {
  const addRecruiterProfile = async (profileData: recruiterProfileInterface|any) => {
    return await repository.addRecruiterProfile(profileData);
  };

  return {
    addRecruiterProfile,
  };
};

export type RecruiterProfileRepositoryInter = typeof recruiterProfileRepositoryInter;
