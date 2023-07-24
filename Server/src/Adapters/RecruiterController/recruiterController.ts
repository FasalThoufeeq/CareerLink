import { RecruiterProfileRepositoryInter } from "../../Application/repostories/recruiterProfileRepositoryInter";
import { RecruiterProfileRepositoryImpl } from "../../Framework/Database/MongoDB/repositories/recruiterProfileRepositoryImpl";
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import {
  UpdateCompanylogo,
  UpdateRecruiterProfile,
  getRecruiterProfile,
} from "../../Application/useCases/auth/auth";
const RecruiterProfileController = (
  recruiterProfileRepositoryImpl: RecruiterProfileRepositoryImpl,
  recruiterProfileRepositoryInter: RecruiterProfileRepositoryInter
) => {
  const recruiterProfileRepository = recruiterProfileRepositoryInter(
    recruiterProfileRepositoryImpl()
  );

  const GettingProfile = asyncHandler(async (req: Request, res: Response) => {
    const { profileId } = req.params;
    const profile = await getRecruiterProfile(
      profileId,
      recruiterProfileRepository
    );

    res.json({
      status: "success",
      message: "Recruiter Profile fetched Successfully",
      profile,
    });
  });

  const UpdatingProfile = asyncHandler(async (req: Request, res: Response) => {
    const { profileId } = req.params;
    const updatedProfile = req.body;
    console.log(profileId, updatedProfile, "wwwe");

    const EditedProfile = await UpdateRecruiterProfile(
      updatedProfile,
      profileId,
      recruiterProfileRepository
    );

    res.json({
      status: "success",
      message: "Profile updated successfully",
      EditedProfile,
    });
  });

  const UpdatingCompanylogo = asyncHandler(
    async (req: Request, res: Response) => {
      const { profileId } = req.params;
      const companylogo: string | any = req?.file?.path;

      const EditedProfile = await UpdateCompanylogo(
        profileId,
        companylogo,
        recruiterProfileRepository
      );

      res.json({
        status: "success",
        message: "CompanyLogo updated successfully",
        EditedProfile,
      });
    }
  );

  return { GettingProfile, UpdatingProfile, UpdatingCompanylogo };
};

export default RecruiterProfileController;
