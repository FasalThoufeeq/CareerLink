import { RecruiterRepositoryImpl } from "../../Framework/Database/MongoDB/repositories/recruiterRepositoryImpl";
import { RecruiterInterface } from "../../Types/recruiterInterface";

export const recruiterRepositoryInter = (
  repository: ReturnType<RecruiterRepositoryImpl>
) => {
  const getRecruiterByEmail = async (email: string) => {
    return repository.getRecruiterByEmail(email);
  };
  const  getRecruiterByUsername= (userName: string) => {
    return repository.getRecruiterByUsername(userName);
  };

  const addRecruiter = (recruiter: RecruiterInterface,profileId:any) => {
    return repository.addRecruiter(recruiter,profileId);
  };
  

  return {
    getRecruiterByEmail,
    addRecruiter,
    getRecruiterByUsername
    
  };
};

export type RecruiterRepositoryInter = typeof recruiterRepositoryInter;
