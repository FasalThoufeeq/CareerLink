import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { AuthServiceImpl } from "../../Framework/Services/authServiceImpl";
import { AuthServiceInter } from "../../Application/Services/authServiceInter";
import { UserRepositoryInter } from "../../Application/repostories/userRepositoryInter";
import { UserRepositoryImpl } from "../../Framework/Database/MongoDB/repositories/userRepositoryImpl";
import { UserInterface } from "../../Types/userInterface";
import {
  userLogin,
  userRegister,
  userGoogleLogin,
  recruiterRegister,
  RecruiterLogin,
  forgottenpassEmail,
  resetPassword,
  InviteEmail,
} from "../../Application/useCases/auth/auth";
import { GoogleUserInteface } from "../../Types/userGoogleInterface";
import { RecruiterRepositoryInter } from "../../Application/repostories/recruiterRepositoryInter";
import { RecruiterRepositoryImpl } from "../../Framework/Database/MongoDB/repositories/recruiterRepositoryImpl";
import { RecruiterInterface } from "../../Types/recruiterInterface";
import { UserProfileRepositoryImpl } from "../../Framework/Database/MongoDB/repositories/userProfileRepositoryImpl";
import { UserProfileRepositoryInter } from "../../Application/repostories/userProfileRepositoryInter";
import { RecruiterProfileRepositoryInter } from "../../Application/repostories/recruiterProfileRepositoryInter";
import { RecruiterProfileRepositoryImpl } from "../../Framework/Database/MongoDB/repositories/recruiterProfileRepositoryImpl";
import { SendEmailInter } from "../../Application/Services/nodemailerInter";
import { SendEmailImpl } from "../../Framework/Services/nodemailerImpl";
const authController = (
  authServiceImpl: AuthServiceImpl,
  authServiceInter: AuthServiceInter,
  userRepositoryImpl: UserRepositoryImpl,
  userRepositoryInter: UserRepositoryInter,
  userProfileRepositoryImpl: UserProfileRepositoryImpl,
  userProfileRepositoryInter: UserProfileRepositoryInter,
  recruiterRepositoryImpl: RecruiterRepositoryImpl,
  recruiterRepositoryInter: RecruiterRepositoryInter,
  recruiterProfileRepositoryImpl: RecruiterProfileRepositoryImpl,
  recruiterProfileRepositoryInter: RecruiterProfileRepositoryInter
) => {
  const authService = authServiceInter(authServiceImpl());
  const userDbRepository = userRepositoryInter(userRepositoryImpl());
  const userProfileRepository = userProfileRepositoryInter(
    userProfileRepositoryImpl()
  );
  const nodemailerRepository = SendEmailInter(SendEmailImpl());
  const recruiterRepository = recruiterRepositoryInter(
    recruiterRepositoryImpl()
  );
  const recruiterProfileRepository = recruiterProfileRepositoryInter(
    recruiterProfileRepositoryImpl()
  );

  const registerUser = asyncHandler(async (req: Request, res: Response) => {
    const user: UserInterface = req.body;

    const createUser = await userRegister(
      user,
      userDbRepository,
      userProfileRepository,
      authService
    );

    res.json({
      status: "success",
      message: "new user registered",
      createUser,
    });
  });

  const loginUser = asyncHandler(async (req: Request, res: Response) => {
    const { email, password }: { email: string; password: string } = req.body;
    const { token, user, profile } = await userLogin(
      email,
      password,
      userDbRepository,
      authService
    );

    res.json({
      status: "success",
      message: "logged in successfully",
      token,
      user,
      profile,
    });
  });

  const googleLoginUser = asyncHandler(async (req: Request, res: Response) => {
    const userDetails: GoogleUserInteface | any = req.body;
    const user: any = {
      firstName: userDetails?._tokenResponse?.firstName,
      lastName: userDetails?._tokenResponse?.lastName,
      email: userDetails?._tokenResponse?.email,
    };
    const { token, isExistingEmail, profile } = await userGoogleLogin(
      user,
      userDbRepository,
      userProfileRepository,
      authService
    );
    res.json({
      status: "success",
      message: "Google login successfull",
      token,
      user: isExistingEmail,
      profile
    });
  });

  const registerRecruiter = asyncHandler(
    async (req: Request, res: Response) => {
      const recruiter: RecruiterInterface = req.body;
      const createRecruiter = await recruiterRegister(
        recruiter,
        recruiterRepository,
        recruiterProfileRepository,
        authService
      );
      res.json({
        status: "success",
        message: "new recruiter registered",
        createRecruiter,
      });
    }
  );
  const loginRecruiter = asyncHandler(async (req: Request, res: Response) => {
    const { email, password }: { email: string; password: string } = req.body;
    const { token, recruiter, profile } = await RecruiterLogin(
      email,
      password,
      recruiterRepository,
      authService,
      recruiterProfileRepository
    );

    res.json({
      status: "success",
      message: "logged in successfully",
      token,
      recruiter,
      profile,
    });
  });

  const forgotPassEmail = asyncHandler(async (req: Request, res: Response) => {
    const { email } = req.body;
    await forgottenpassEmail(
      email,
      authService,
      userDbRepository,
      nodemailerRepository
    );

    res.json({
      status: "success",
      message: "reset password link send to the user email",
    });
  });

  const resetingPassword = asyncHandler(async (req: Request, res: Response) => {
    const { resetToken } = req.params;
    const { password } = req.body;
    
    await resetPassword(resetToken, password, authService, userDbRepository);
    res.json({
      status: "success",
      message: "Your password Reset Successfully",
    });
  });

  const InvitingEmail=asyncHandler(async(req: Request, res: Response)=>{
    const {name,email,roomId,jobTitle,companyName} = req.body
    await InviteEmail(name, email, roomId, jobTitle, companyName,nodemailerRepository)
    res.json({
      status: "success",
      message: "Invite Email send Successfully",
    });
  })

  return {
    registerUser,
    loginUser,
    googleLoginUser,
    registerRecruiter,
    loginRecruiter,
    forgotPassEmail,
    resetingPassword,
    InvitingEmail
  };
};

export default authController;
