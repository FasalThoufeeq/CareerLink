import mongoose from "mongoose";
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
  const getAllJobs = async () => await repository.getAllJobs();

  const ApplyJob = async (
    jobId: mongoose.Types.ObjectId,
    applicantId: mongoose.Types.ObjectId
  ) => await repository.ApplyJob(jobId, applicantId);

  const getCandidates = async (jobId: string) => {
    return await repository.getCandidates(jobId);
  };
  const changeStatus = async (
    jobId: string,
    applicantId: string,
    status: string
  ) => {
    const updatedProfile = await repository.changeStatus(
      jobId,
      applicantId,
      status
    );
    return updatedProfile;
  };
  const getAppliedJobs = async (profileId: string) => {
    const profile = await repository.getAppliedJobs(profileId);
    return profile;
  };

  const cancelJob = async (jobId: string, applicantId: string) => {
    await repository.cancelJob(jobId, applicantId);
  };

  const EditJobs = async (EditedDetails: JobInterface, jobId: string) => {
    const jobDetails = await repository.EditJobs(EditedDetails, jobId);
    return jobDetails;
  };

  const FetchJob = async (jobId: string) => {
    const jobDetails = await repository.FetchJob(jobId)
    return jobDetails;
  };

  return {
    addJob,
    getRecruiterJobs,
    getAllJobs,
    ApplyJob,
    getCandidates,
    changeStatus,
    getAppliedJobs,
    cancelJob,
    EditJobs,
    FetchJob
  };
};

export type JobRepositoryInter = typeof jobRepositoryInter;
