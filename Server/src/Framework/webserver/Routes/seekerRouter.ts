import express from "express";
import seekerController from "../../../Adapters/SeekerController/seekerController";
import { jobRepositoryImp } from "../../Database/MongoDB/repositories/jobRepositoryImpl";
import { jobRepositoryInter } from "../../../Application/repostories/jobRepositoryInter";
import { userProfileRepositoryImpl } from "../../Database/MongoDB/repositories/userProfileRepositoryImpl";
import { userProfileRepositoryInter } from "../../../Application/repostories/userProfileRepositoryInter";
import upload, { uploadprofile } from "../Middlewares/cloudinary";
import seekerAuthMiddleware from "../Middlewares/seekerAuthMiddleware";

const seekerRoute = () => {
  const router = express.Router();
  const controller = seekerController(
    jobRepositoryImp,
    jobRepositoryInter,
    userProfileRepositoryImpl,
    userProfileRepositoryInter
  );

  router.get("/all_jobs", controller.getAllJobs);

  router.post("/apply_job",seekerAuthMiddleware, controller.JobApply);

  router.get("/seeker_profile/:profileId", controller.GetSeekerProfile);

  router.get("/applied_jobs/:profileId",seekerAuthMiddleware, controller.AppliedJob);

  router.put("/cancel_job",seekerAuthMiddleware, controller.JobAppliedCancel);

  router.put("/update_profile/:profileId",seekerAuthMiddleware, upload, controller.UpdatingProfile);

  router.put("/update_profilePic/:profileId",seekerAuthMiddleware, uploadprofile, controller.UpdatingProfilePic);

  return router;
};

export default seekerRoute;
