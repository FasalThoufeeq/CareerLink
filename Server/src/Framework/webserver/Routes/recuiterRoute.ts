import express from "express";
import jobController from "../../../Adapters/JobController/jobController";
import { jobRepositoryImp } from "../../Database/MongoDB/repositories/jobRepositoryImpl";
import { jobRepositoryInter } from "../../../Application/repostories/jobRepositoryInter";
import RecruiterProfileController from "../../../Adapters/RecruiterController/recruiterController";
import { recruiterProfileRepositoryImpl } from "../../Database/MongoDB/repositories/recruiterProfileRepositoryImpl";
import { recruiterProfileRepositoryInter } from "../../../Application/repostories/recruiterProfileRepositoryInter";
import { uploadCompanylogo } from "../Middlewares/cloudinary";
import AuthMiddleware from "../Middlewares/authMiddleware";
const recruiterRoute = () => {
  const router = express.Router();
  const controller = jobController(jobRepositoryImp, jobRepositoryInter);
  const profileController = RecruiterProfileController(
    recruiterProfileRepositoryImpl,
    recruiterProfileRepositoryInter
  );

  router.post("/post_jobs",AuthMiddleware, controller.postJob);

  router.get("/get_jobs/:recruiterId",AuthMiddleware, controller.RecruiterAllJobs);

  router.get("/applied_candidates/:jobId",AuthMiddleware, controller.GetAppliedCandidates);

  router.post("/change_status",AuthMiddleware, controller.StatusChange);

  router.get("/get_profile/:profileId", profileController.GettingProfile);

  router.put("/update_profile/:profileId",AuthMiddleware, profileController.UpdatingProfile);

  router.put(
    "/update_companylogo/:profileId",AuthMiddleware,
    uploadCompanylogo,
    profileController.UpdatingCompanylogo
  );

  router.put("/edit_jobs/:jobId",AuthMiddleware, controller.EdittingJob);

  router.get("/get_job/:jobId",AuthMiddleware, controller.FetchingJob);

  router.put("/push_notification",AuthMiddleware, controller.pushingNotification);

  return router;
};

export default recruiterRoute;
