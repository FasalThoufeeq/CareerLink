import { Request, Response } from "express";
import { JobRepositoryInter } from "../../Application/repostories/jobRepositoryInter";
import {
  changeStatus,
  createJob,
  getCandidates,
  getRecruiterJobs,
} from "../../Application/useCases/job/job";
import { JobRepositoryImp } from "../../Framework/Database/MongoDB/repositories/jobRepositoryImpl";
import { JobInterface } from "../../Types/jobInterface";
import asyncHandler from "express-async-handler";

const jobController = (
  jobRepositoryImpl: JobRepositoryImp,
  jobRepositoryInter: JobRepositoryInter
) => {
  const jobRepository = jobRepositoryInter(jobRepositoryImpl());

  const postJob = asyncHandler(async (req: Request, res: Response) => {
    const jobDetails: any = req.body;
    console.log(jobDetails);

    const postedJob = await createJob(jobDetails, jobRepository);
    res.json({
      postedJob,
      status: "success",
      message: "new job created",
    });
  });

  const RecruiterAllJobs = asyncHandler(async (req: Request, res: Response) => {
    const { recruiterId } = req.params;
    const RecruiterJobs = await getRecruiterJobs(recruiterId, jobRepository);
    res.json({
      RecruiterJobs,
      status: "success",
      message: "jobs fetched successfully",
    });
  });

  const GetAppliedCandidates = asyncHandler(
    async (req: Request, res: Response) => {
      const { jobId } = req.params;
      const Candidates = await getCandidates(jobId, jobRepository);
      res.json({
        Candidates,
        status: "success",
        message: "fetched candidates successfully",
      });
    }
  );

  const StatusChange = asyncHandler(async (req: Request, res: Response) => {
    const { jobId, applicantId, status } = req.query;
    const updatedProfile = await changeStatus(
      jobId?.toString() || "",
      applicantId?.toString() || "",
      status?.toString() || "",
      jobRepository
    );

    res.json({
      status: "success",
      message: "status updated successfully",
      updatedProfile,
    });
  });

  return {
    postJob,
    RecruiterAllJobs,
    GetAppliedCandidates,
    StatusChange,
  };
};

export default jobController;
