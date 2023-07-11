import { JobRepositoryImp } from "../../Framework/Database/MongoDB/repositories/jobRepositoryImpl";
import { JobInterface } from "../../Types/jobInterface";

export const jobRepositoryInter = (
  repository: ReturnType<JobRepositoryImp>
) => {
  const addJob = async (job: JobInterface) => {
    return await repository.addJob(job);
  };

  const getRecruiterJobs = async (recruiterId: string) => {
    return await repository.getRecruiterJobs(recruiterId);
  };
  return {
    addJob,
    getRecruiterJobs
  };
};

export type JobRepositoryInter = typeof jobRepositoryInter;
