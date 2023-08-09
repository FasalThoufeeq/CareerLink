import mongoose from "mongoose";
import { JobInterface } from "../../../../Types/jobInterface";
import { Job } from "../models/jobModel";
import { UserProfile } from "../models/userProfileModel";
import AppError from "../../../../Utils/AppError";
import { HttpStatus } from "../../../../Types/httpStatus";

export const jobRepositoryImp = () => {
  const addJob = async (job: JobInterface) => {
    const newJob: any = new Job(job);
    const savedJob = await newJob.save();
    return savedJob;
  };

  const getRecruiterJobs = async (recruiterId: string) => {
    const recruiterJobs = await Job.find({ recruiterId: recruiterId })
      .sort({
        createdAt: -1,
      })
      .populate("recruiterId");
    return recruiterJobs;
  };

  const getAllJobs = async () => {
    const jobList = await Job.find()
      .sort({ createdAt: -1 })
      .populate("recruiterId");
    return jobList;
  };

  const ApplyJob = async (
    jobId: mongoose.Types.ObjectId,
    applicantId: mongoose.Types.ObjectId
  ) => {
    const userProfile = await UserProfile.findOne({ _id: applicantId });

    const job = await Job.findById(jobId);
    if (!userProfile || !job) {
      throw new AppError("Invalid job or user profile", HttpStatus.BAD_REQUEST);
    }
    const appliedJobs = userProfile.appliedJobs;
    const jobExist = appliedJobs.some(
      (appliedJob: any) => appliedJob._id == jobId
    );

    if (!jobExist) {
      appliedJobs.push({ _id: jobId.toString(), status: "pending" });
    }

    const applicants = job.appliedUsers;
    if (!applicants.includes(applicantId)) {
      applicants.push(applicantId);
      job.appliedUsers = applicants;
    }
    return await Promise.all([job.save(), userProfile.save()]).then(
      (result) => {
        return result;
      }
    );
  };

  const getCandidates = async (jobId: string) => {
    const appliedCandidates = await Job.findById(jobId).populate(
      "appliedUsers"
    );
    return appliedCandidates;
  };

  const changeStatus = async (
    jobId: string,
    applicantId: string,
    status: string
  ) => {
    const userprofile = await UserProfile.findById(applicantId);
    if (!userprofile) {
      return;
    }
    const appliedJob = userprofile.appliedJobs.find(
      (job) => job._id?.toString() == jobId
    );

    if (!appliedJob) {
      return;
    }
    appliedJob.status = status;
    const updatedProfile = await userprofile.save();
    return updatedProfile;
  };

  const getAppliedJobs = async (profileId: string) => {
    const profile = await UserProfile.findById(profileId).populate(
      "appliedJobs._id"
    );
    return profile;
  };

  const cancelJob = async (jobId: string, applicantId: string) => {
    const updateInUserProfile = await UserProfile.updateOne(
      { _id: applicantId },
      { $pull: { appliedJobs: { _id: jobId } } }
    );
    const updateInJob = await Job.updateOne(
      { _id: jobId },
      { $pull: { appliedUsers: applicantId } }
    );
  };

  const EditJobs = async (EditedDetails: JobInterface, jobId: string) => {
    const jobDetails = await Job.findByIdAndUpdate(
      { _id: jobId },
      { $set: EditedDetails },
      { new: true }
    );

    return jobDetails;
  };

  const FetchJob = async (jobId: string) => {
    const jobDetails = await Job.findOne({ _id: jobId }).populate(
      "recruiterId"
    );
    return jobDetails;
  };

  const pushNotification = async (
    applicantId: string,
    notification: string,
    notificationSummary: string
  ) => {
    await UserProfile.findByIdAndUpdate(
      { _id: applicantId },
      {
        $push: {
          notifications: {
            notification: notification,
            notificationSummary: notificationSummary,
          },
        },
      }
    );

    return;
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
    FetchJob,
    pushNotification,
  };
};

export type JobRepositoryImp = typeof jobRepositoryImp;
