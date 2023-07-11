import { JobInterface } from "../../../../Types/jobInterface";
import { Job } from "../models/jobModel";

export const jobRepositoryImp = () => {
  const addJob = async (job: JobInterface) => {
    const newJob: any = new Job(job);
    const savedJob = await newJob.save();
    return savedJob;
  };

  const getRecruiterJobs = async (recruiterId: string) => {
    const recruiterJobs = await Job.find({ recruiterId: recruiterId });
    return recruiterJobs
  };
  return {
    addJob,
    getRecruiterJobs
  };
};

export type JobRepositoryImp = typeof jobRepositoryImp;
