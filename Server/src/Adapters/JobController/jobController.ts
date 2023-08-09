import { Request, Response } from "express";
import { JobRepositoryInter } from "../../Application/repostories/jobRepositoryInter";
import {
  EditJobs,
  FetchJob,
  PushNotification,
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

  const EdittingJob = asyncHandler(async (req: Request, res: Response) => {
    const { jobId } = req.params;
    const EditedDetails = req.body;
    const jobDetails = await EditJobs(EditedDetails, jobId, jobRepository);

    res.json({
      status: "success",
      message: "Job Edited Successfully",
      jobDetails,
    });
  });

  const FetchingJob = asyncHandler(async (req: Request, res: Response) => {
    const { jobId } = req.params;
    const jobDetails = await FetchJob(jobId, jobRepository);

    res.json({
      status: "success",
      message: "Job Fetched Successfully",
      jobDetails,
    });
  });

  const pushingNotification = asyncHandler(
    async (req: Request, res: Response) => {
      const { applicantId, notification, notificationSummary } = req.body;

      await PushNotification(
        applicantId,
        notification,
        notificationSummary,
        jobRepository
      );

      res.json({
        status: "success",
        message: "notification successfully pushed",
      });
    }
  );

  return {
    postJob,
    RecruiterAllJobs,
    GetAppliedCandidates,
    StatusChange,
    EdittingJob,
    FetchingJob,
    pushingNotification,
  };
};

export default jobController;
