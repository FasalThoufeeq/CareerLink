import { recruiterProfileInterface } from "../../../Types/recruiterProfileInterface";
import { UserInterface } from "../../../Types/userInterface";
import { AuthServiceInter } from "../../Services/authServiceInter";
import { SendEmailInterReturn } from "../../Services/nodemailerInter";
import { RecruiterProfileRepositoryInter } from "../../repostories/recruiterProfileRepositoryInter";
import { RecruiterRepositoryInter } from "../../repostories/recruiterRepositoryInter";
import { UserProfileRepositoryInter } from "../../repostories/userProfileRepositoryInter";
import { UserRepositoryInter } from "../../repostories/userRepositoryInter";

export const userRegister = async (
  user: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: Number;
    password: string;
  },
  userRepository: ReturnType<UserRepositoryInter>,
  userProfileRepository: ReturnType<UserProfileRepositoryInter>,
  authService: ReturnType<AuthServiceInter>
) => {
  user.email = user.email.toLocaleLowerCase();

  const isExistingEmail = await userRepository.getUserByEmail(user.email);
  if (isExistingEmail) {
    throw new Error(`User with ${user.email} already exists`);
  }

  user.password = await authService.encryptPassword(user.password);

  const profile = await userProfileRepository.addProfile(user);

  const createUser = await userRepository.addUser(user, profile._id);
  return createUser;
};

export const userLogin = async (
  email: string,
  password: string,
  userRepository: ReturnType<UserRepositoryInter>,
  authService: ReturnType<AuthServiceInter>
) => {
  const user: UserInterface | any = await userRepository.getUserByEmail(email);

  if (!user) {
    throw new Error(`User not exist`);
  }

  const ispasswordCorrect = await authService.comparePassword(
    password,
    user.password
  );

  if (!ispasswordCorrect) {
    throw new Error(`Password incorrect`);
  }
  const profile = await userRepository.getUserProfileByEmail(email);
  const role = "User";
  const token = authService.generateToken(user._id.toString(), role);
  return { token, user, profile };
};

export const userGoogleLogin = async (
  user: {
    firstName: string;
    lastName: string;
    email: string;
  },
  userRepository: ReturnType<UserRepositoryInter>,
  userProfileRepository: ReturnType<UserProfileRepositoryInter>,
  authService: ReturnType<AuthServiceInter>
) => {
  const isExistingEmail: any = await userRepository.getUserByEmail(user.email);
  const role = "User";
  if (isExistingEmail) {
    const token = await authService.generateToken(
      isExistingEmail._id.toString(),
      role
    );
    const profile = await userRepository.getUserProfileByEmail(user.email);
    return { token, isExistingEmail, profile };
  } else {
    const profile = await userProfileRepository.addProfile(user);
    const createUser = await userRepository.addUser(user, profile._id);
    const isExistingEmail: any = await userRepository.getUserByEmail(
      user.email
    );
    const token = await authService.generateToken(
      isExistingEmail._id.toString(),
      role
    );
    return { token, isExistingEmail, profile };
  }
};

export const recruiterRegister = async (
  recruiter: {
    companyName: string;
    userName: string;
    email: string;
    password: string;
  },
  recruiterRepository: ReturnType<RecruiterRepositoryInter>,
  recruiterProfileRepository: ReturnType<RecruiterProfileRepositoryInter>,
  authService: ReturnType<AuthServiceInter>
) => {
  recruiter.email = recruiter.email.toLocaleLowerCase();
  const isExistingEmail = await recruiterRepository.getRecruiterByEmail(
    recruiter.email
  );
  if (isExistingEmail) {
    throw new Error(`Recruiter with ${recruiter.email} already exists`);
  }

  const isExistingUsername = await recruiterRepository.getRecruiterByUsername(
    recruiter.userName
  );

  if (isExistingUsername) {
    throw new Error(
      `Recruiter with UserName ${recruiter.userName} already exists`
    );
  }

  recruiter.password = await authService.encryptPassword(recruiter.password);
  const recruiterProfile = await recruiterProfileRepository.addRecruiterProfile(
    recruiter
  );
  const createRecruiter = await recruiterRepository.addRecruiter(
    recruiter,
    recruiterProfile._id
  );
  return createRecruiter;
};

export const RecruiterLogin = async (
  email: string,
  password: string,
  recruiterRepository: ReturnType<RecruiterRepositoryInter>,
  authService: ReturnType<AuthServiceInter>,
  recruiterProfilerepository: ReturnType<RecruiterProfileRepositoryInter>
) => {
  const recruiter: UserInterface | any =
    await recruiterRepository.getRecruiterByEmail(email);

  if (!recruiter) {
    throw new Error(`Recruiter not exist`);
  }

  const ispasswordCorrect = await authService.comparePassword(
    password,
    recruiter.password
  );

  if (!ispasswordCorrect) {
    throw new Error(`Password incorrect`);
  }

  const profile = await recruiterProfilerepository.getRecuiterProfileByEmail(
    email
  );
  const role = "Admin";
  const token = authService.generateToken(recruiter._id.toString(), role);
  return { token, recruiter, profile };
};

export const getProfile = async (
  profileId: string,
  userProfileRepository: ReturnType<UserProfileRepositoryInter>
) => {
  return await userProfileRepository.getProfile(profileId);
};

export const UpdateProfile = async (
  profileId: string,
  profile: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    education: string;
    experience: string;
    languages: string[];
    skills: string[];
    resume: string;
    profilePicture: string;
  },
  resume: string,
  userProfileRepository: ReturnType<UserProfileRepositoryInter>
) => {
  profile.resume = resume;
  const EditedProfile = await userProfileRepository.updateProfile(
    profileId,
    profile
  );
  return EditedProfile;
};

export const UpdateProfilepic = async (
  profileId: string,
  profilePic: string,
  userProfileRepository: ReturnType<UserProfileRepositoryInter>
) => {
  const EditedData = await userProfileRepository.updateProfilePic(
    profileId,
    profilePic
  );
  return EditedData;
};

export const getRecruiterProfile = async (
  profileId: string,
  RecruiterProfileRepository: ReturnType<RecruiterProfileRepositoryInter>
) => {
  const profile = await RecruiterProfileRepository.getRecuiterProfile(
    profileId
  );
  return profile;
};

export const UpdateRecruiterProfile = async (
  updatedProfile: recruiterProfileInterface,
  profileId: string,
  RecruiterProfileRepository: ReturnType<RecruiterProfileRepositoryInter>
) => {
  const EditedProfile = await RecruiterProfileRepository.updateProfile(
    updatedProfile,
    profileId
  );

  return EditedProfile;
};

export const UpdateCompanylogo = async (
  profileId: string,
  companylogo: string,
  RecruiterProfileRepository: ReturnType<RecruiterProfileRepositoryInter>
) => {
  const EditedProfile = await RecruiterProfileRepository.updateLogo(
    profileId,
    companylogo
  );

  return EditedProfile;
};

export const forgottenpassEmail = async (
  email: string,
  authService: ReturnType<AuthServiceInter>,
  userRepository: ReturnType<UserRepositoryInter>,
  nodemailerRepository: SendEmailInterReturn
) => {
  const user = await userRepository.getUserByEmail(email);

  if (!user) {
    throw new Error(`User with ${email} not exists`);
  }

  const resetPasswordToken = await authService.createResetPasswordToken();

  const hashResetPasswordToken = await authService.hashResetPasswordToken(
    resetPasswordToken
  );
  const passwordResetTokenExpires = new Date(Date.now() + 10 * 60 * 1000);

  const saving = await userRepository.savingResetToken(
    email,
    hashResetPasswordToken,
    passwordResetTokenExpires
  );

  await nodemailerRepository.ResetPasswordEmail(email, resetPasswordToken);
};

export const resetPassword = async (
  resetToken: string,
  password: string,
  authService: ReturnType<AuthServiceInter>,
  userRepository: ReturnType<UserRepositoryInter>
) => {
  const hashedResetToken = await authService.hashResetPasswordToken(resetToken);

  const user = await userRepository.getUserByResetToken(hashedResetToken);

  if (!user) {
    throw new Error(`Your reset Token has expired. Please try again`);
  }

  const hashedPassword = await authService.encryptPassword(password);

  await userRepository.resetPassword(hashedResetToken, hashedPassword);

  return;
};

export const InviteEmail = async (
  name: string,
  email: string,
  roomId: string,
  jobTitle: string,
  companyName: string,
  nodemailerRepository: SendEmailInterReturn
) => {
  await nodemailerRepository.InviteEmail(
    name,
    email,
    roomId,
    jobTitle,
    companyName
  );
  return;
};
