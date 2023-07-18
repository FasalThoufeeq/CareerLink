import { Request, Response } from "express";
import {
  AllJobs,
  ApplyJob,
  cancelJob,
  getAppliedJobs,
} from "../../Application/useCases/job/job";
import asyncHandler from "express-async-handler";
import { JobRepositoryImp } from "../../Framework/Database/MongoDB/repositories/jobRepositoryImpl";
import { JobRepositoryInter } from "../../Application/repostories/jobRepositoryInter";
import { getProfile } from "../../Application/useCases/auth/auth";
import { UserProfileRepositoryImpl } from "../../Framework/Database/MongoDB/repositories/userProfileRepositoryImpl";
import { UserProfileRepositoryInter } from "../../Application/repostories/userProfileRepositoryInter";

const seekerController = (
  jobRepositoryImp: JobRepositoryImp,
  jobRepositoryInter: JobRepositoryInter,
  userProfileRepositoryImpl: UserProfileRepositoryImpl,
  userProfileRepositoryInter: UserProfileRepositoryInter
) => {
  const userProfileRepository = userProfileRepositoryInter(
    userProfileRepositoryImpl()
  );
  const jobRepository = jobRepositoryInter(jobRepositoryImp());
  const getAllJobs = asyncHandler(async (req: Request, res: Response) => {
    const jobs = await AllJobs(jobRepository);
    res.json({
      status: "success",
      message: "jobs fetched successfully",
      jobs,
    });
  });

  const JobApply = asyncHandler(async (req: Request, res: Response) => {
    const { applicantId }: any = req.query;
    const { jobId }: any = req.query;
    const jobApply = await ApplyJob(jobId, applicantId, jobRepository);
    res.json({
      jobApply,
      status: "success",
      message: "job applied successfully",
    });
  });

  const GetSeekerProfile = asyncHandler(async (req: Request, res: Response) => {
    const { profileId } = req.params;
    const profile = await getProfile(profileId, userProfileRepository);

    res.json({
      status: "success",
      message: "user profile fetched successfully",
      profile,
    });
  });

  const AppliedJob = asyncHandler(async (req: Request, res: Response) => {
    const { profileId } = req.params;
    const profile = await getAppliedJobs(profileId, jobRepository);

    res.json({
      status: "success",
      message: "applied jobs fetched successfully",
      profile,
    });
  });

  const JobAppliedCancel = asyncHandler(async (req: Request, res: Response) => {
    const { jobId, applicantId } = req.query;
    await cancelJob(
      jobId?.toString() || "",
      applicantId?.toString() || "",
      jobRepository
    );
    res.json({
      status: "success",
      meassage: "Successfully Job Removed From Apllied list",
    });
  });

  return {
    getAllJobs,
    JobApply,
    GetSeekerProfile,
    AppliedJob,
    JobAppliedCancel
  };
};

export default seekerController;
