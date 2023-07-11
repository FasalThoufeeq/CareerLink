import { Request, Response } from "express";
import { JobRepositoryInter } from "../../Application/repostories/jobRepositoryInter";
import {
  createJob,
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
    const {recruiterId}= req.params;
    // console.log(recruiterId);
    const RecruiterJobs = await getRecruiterJobs(recruiterId, jobRepository);
    res.json({
      RecruiterJobs,
      status: "success",
      message: "jobs fetched successfully",
    });
  });

  return {
    postJob,
    RecruiterAllJobs
  };
};

export default jobController;
