import express from "express";
import jobController from "../../../Adapters/JobController/jobController";
import { jobRepositoryImp } from "../../Database/MongoDB/repositories/jobRepositoryImpl";
import { jobRepositoryInter } from "../../../Application/repostories/jobRepositoryInter";
import RecruiterProfileController from "../../../Adapters/RecruiterController/recruiterController";
import { recruiterProfileRepositoryImpl } from "../../Database/MongoDB/repositories/recruiterProfileRepositoryImpl";
import { recruiterProfileRepositoryInter } from "../../../Application/repostories/recruiterProfileRepositoryInter";
import { uploadCompanylogo } from "../Middlewares/cloudinary";
const recruiterRoute = () => {
  const router = express.Router();
  const controller = jobController(jobRepositoryImp, jobRepositoryInter);
  const profileController = RecruiterProfileController(
    recruiterProfileRepositoryImpl,
    recruiterProfileRepositoryInter
  );

  router.post("/post_jobs", controller.postJob);

  router.get("/get_jobs/:recruiterId", controller.RecruiterAllJobs);

  router.get("/applied_candidates/:jobId", controller.GetAppliedCandidates);

  router.post("/change_status", controller.StatusChange);

  router.get("/get_profile/:profileId", profileController.GettingProfile);

  router.put("/update_profile/:profileId", profileController.UpdatingProfile);

  router.put(
    "/update_companylogo/:profileId",
    uploadCompanylogo,
    profileController.UpdatingCompanylogo
  );

  router.put("/edit_jobs/:jobId", controller.EdittingJob);

  router.get("/get_job/:jobId", controller.FetchingJob);

  return router;
};

export default recruiterRoute;
