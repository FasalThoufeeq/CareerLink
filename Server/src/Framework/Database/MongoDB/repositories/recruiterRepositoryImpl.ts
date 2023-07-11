import { RecruiterInterface } from "../../../../Types/recruiterInterface";
import { Recruiter } from "../models/recruiterModel";

export const recruiterRepositoryImpl = () => {
  const getRecruiterByEmail = async (email: string) => {
    const recruiter: RecruiterInterface | null = await Recruiter.findOne({
      email: email,
    });
    return recruiter;
  };
  const getRecruiterByUsername = async (userName: string) => {
    const recruiter: RecruiterInterface | null = await Recruiter.findOne({
      userName: userName,
    });
    return recruiter;
  };
  
  const addRecruiter = async (recruiter: RecruiterInterface) => {
    const newRecruiter: any = new Recruiter(recruiter);
    const savedRecuiter = await newRecruiter.save();
    return savedRecuiter;
  };

  return{
    getRecruiterByEmail,
    addRecruiter,
    getRecruiterByUsername
  }
};

export type RecruiterRepositoryImpl=typeof recruiterRepositoryImpl
