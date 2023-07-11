import { JobRepositoryInter } from "../../repostories/jobRepositoryInter";

export const createJob = async(
  job: {
    _id: string;
    jobTitle: string;
    jobType: string;
    jobVacancies: string;
    jobTiming: string;
    about: string;
    essentialKnowledge: string;
    skills: string[];
    jobLocation: string;
    qualification: string;
    salary: string;
    experience: string;
    deadline: Date;
    createdAt: Date;
    updatedAt: Date;
  },
  JobRepository: ReturnType<JobRepositoryInter>
) => {
  const addedJob =await JobRepository.addJob(job);
  return addedJob
};


export const getRecruiterJobs=async(
    recruiterId:string,
    JobRepository: ReturnType<JobRepositoryInter>
)=>{
    const RecruiterAllJobs=await JobRepository.getRecruiterJobs(recruiterId)
    return RecruiterAllJobs
}