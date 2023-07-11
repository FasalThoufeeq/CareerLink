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

  const addRecruiter = (recruiter: RecruiterInterface) => {
    return repository.addRecruiter(recruiter);
  };
  

  return {
    getRecruiterByEmail,
    addRecruiter,
    getRecruiterByUsername
    
  };
};

export type RecruiterRepositoryInter = typeof recruiterRepositoryInter;
