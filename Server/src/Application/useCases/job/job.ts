import mongoose from "mongoose";
import { JobRepositoryInter } from "../../repostories/jobRepositoryInter";

export const createJob = async (
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
  const addedJob = await JobRepository.addJob(job);
  return addedJob;
};

export const getRecruiterJobs = async (
  recruiterId: string,
  JobRepository: ReturnType<JobRepositoryInter>
) => {
  const RecruiterAllJobs = await JobRepository.getRecruiterJobs(recruiterId);
  return RecruiterAllJobs;
};

export const AllJobs = async (
  JobRepository: ReturnType<JobRepositoryInter>
) => {
  const allJobs = await JobRepository.getAllJobs();
  return allJobs;
};

export const ApplyJob = async (
  jobId: mongoose.Types.ObjectId,
  applicantId: mongoose.Types.ObjectId,
  jobRepository: ReturnType<JobRepositoryInter>
) => {
  const ApplyJob = await jobRepository.ApplyJob(jobId, applicantId);
  return ApplyJob;
};

export const getCandidates = async (
  JobId: string,
  jobRepository: ReturnType<JobRepositoryInter>
) => {
  const getCandidates = await jobRepository.getCandidates(JobId);
  return getCandidates;
};

export const getAppliedJobs = async (
  profileId: string,
  jobRepository: ReturnType<JobRepositoryInter>
) => {
  const profile = await jobRepository.getAppliedJobs(profileId);
  return profile;
};
export const changeStatus = async (
  jobId: string,
  applicantId: string,
  status: string,
  jobRepository: ReturnType<JobRepositoryInter>
) => {
  const updatedProfile = await jobRepository.changeStatus(
    jobId,
    applicantId,
    status
  );
};

export const cancelJob = async (
  jobId: string,
  applicantId: string,
  jobRepository: ReturnType<JobRepositoryInter>
) => {
  await jobRepository.cancelJob(jobId, applicantId);
};
