import { UserInterface } from "../../../Types/userInterface";
import { AuthServiceInter } from "../../Services/authServiceInter";
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
  console.log(profile, "hiiihihihhii");

  const token = authService.generateToken(user._id.toString());
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
  if (isExistingEmail) {
    const token = await authService.generateToken(
      isExistingEmail._id.toString()
    );
    return { token, isExistingEmail };
  } else {
    const profile = await userProfileRepository.addProfile(user);
    const createUser = await userRepository.addUser(user, profile._id);
    const isExistingEmail: any = await userRepository.getUserByEmail(
      user.email
    );
    console.log(isExistingEmail, "haaaaavooooo");
    const token = await authService.generateToken(
      isExistingEmail._id.toString()
    );
    return { token, isExistingEmail };
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
  console.log(isExistingUsername, "aaaaaaa");

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
  authService: ReturnType<AuthServiceInter>
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

  const token = authService.generateToken(recruiter._id.toString());
  return { token, recruiter };
};

export const getProfile = async (
  profileId: string,
  userProfileRepository: ReturnType<UserProfileRepositoryInter>
) => {
  return await userProfileRepository.getProfile(profileId);
};
