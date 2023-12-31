import express from "express";
import authController from "../../../Adapters/AuthController/authContoller";
import { userRepositoryImpl } from "../../Database/MongoDB/repositories/userRepositoryImpl";
import { userRepositoryInter } from "../../../Application/repostories/userRepositoryInter";
import { authServiceImpl } from "../../Services/authServiceImpl";
import { authServiceInter } from "../../../Application/Services/authServiceInter";
import { recruiterRepositoryInter } from "../../../Application/repostories/recruiterRepositoryInter";
import { recruiterRepositoryImpl } from "../../Database/MongoDB/repositories/recruiterRepositoryImpl";
import { userProfileRepositoryInter } from "../../../Application/repostories/userProfileRepositoryInter";
import { userProfileRepositoryImpl } from "../../Database/MongoDB/repositories/userProfileRepositoryImpl";
import { recruiterProfileRepositoryInter } from "../../../Application/repostories/recruiterProfileRepositoryInter";
import { recruiterProfileRepositoryImpl } from "../../Database/MongoDB/repositories/recruiterProfileRepositoryImpl";

const authRoute = () => {
  const router = express.Router();
  const controller = authController(
    authServiceImpl,
    authServiceInter,
    userRepositoryImpl,
    userRepositoryInter,
    userProfileRepositoryImpl,
    userProfileRepositoryInter,
    recruiterRepositoryImpl,
    recruiterRepositoryInter,
    recruiterProfileRepositoryImpl,
    recruiterProfileRepositoryInter
  );

  router.post("/signup", controller.registerUser);

  router.post("/login", controller.loginUser);

  router.post("/google-login", controller.googleLoginUser);

  router.post("/recruiter/signup", controller.registerRecruiter);

  router.post("/recruiter/login", controller.loginRecruiter);

  router.post("/seeker/forgot_pass_email_submit", controller.forgotPassEmail);

  router.put("/seeker/reset_password/:resetToken", controller.resetingPassword);

  router.post('/invite_email',controller.InvitingEmail)


  return router;
};

export default authRoute;
