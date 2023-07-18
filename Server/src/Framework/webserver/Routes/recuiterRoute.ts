import express from "express";
import jobController from "../../../Adapters/JobController/jobController";
import { jobRepositoryImp } from "../../Database/MongoDB/repositories/jobRepositoryImpl";
import { jobRepositoryInter } from "../../../Application/repostories/jobRepositoryInter";

const recruiterRoute = () => {
  const router = express.Router();
  const controller = jobController(jobRepositoryImp, jobRepositoryInter);

  router.post("/post_jobs", controller.postJob);
  
  router.get('/get_jobs/:recruiterId',controller.RecruiterAllJobs)

  router.get('/applied_candidates/:jobId',controller.GetAppliedCandidates)

  router.post('/change_status',controller.StatusChange)

  return router;
};

export default recruiterRoute;
