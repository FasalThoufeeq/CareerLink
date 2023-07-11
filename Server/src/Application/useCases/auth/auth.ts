import { UserInterface } from "../../../Types/userInterface";
import { AuthServiceInter } from "../../Services/authServiceInter";
import { RecruiterRepositoryInter } from "../../repostories/recruiterRepositoryInter";
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
  authService: ReturnType<AuthServiceInter>
) => {
  console.log("eeeee");
  user.email = user.email.toLocaleLowerCase();
  const isExistingEmail = await userRepository.getUserByEmail(user.email);
  if (isExistingEmail) {
    throw new Error(`User with ${user.email} already exists`);
  }

  user.password = await authService.encryptPassword(user.password);

  const createUser = await userRepository.addUser(user);
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

  const token = authService.generateToken(user._id.toString());
  return { token, user };
};

export const userGoogleLogin = async (
  user: {
    firstName: string;
    lastName: string;
    email: string;
  },
  userRepository: ReturnType<UserRepositoryInter>,
  authService: ReturnType<AuthServiceInter>
) => {
  const isExistingEmail: any = await userRepository.getUserByEmail(user.email);
  if (isExistingEmail) {
    const token = await authService.generateToken(
      isExistingEmail._id.toString()
    );
    return { token, isExistingEmail };
  }else{
    const createUser = await userRepository.addUser(user);
    const isExistingEmail: any = await userRepository.getUserByEmail(user.email);
    console.log(isExistingEmail,"haaaaavooooo");
    const token = await authService.generateToken(isExistingEmail._id.toString());
    return{token ,isExistingEmail}

  }
};


export const recruiterRegister=async(
  recruiter:{
    companyName: string;
    userName: string;
    email: string;
    password: string;
  },
  recruiterRepository:ReturnType<RecruiterRepositoryInter>,
  authService:ReturnType<AuthServiceInter>
)=>{

  recruiter.email=recruiter.email.toLocaleLowerCase()
  const isExistingEmail = await recruiterRepository.getRecruiterByEmail(recruiter.email);
  if (isExistingEmail) {
    throw new Error(`Recruiter with ${recruiter.email} already exists`);
  }
  
  const isExistingUsername = await recruiterRepository.getRecruiterByUsername(recruiter.userName);
  console.log(isExistingUsername,'aaaaaaa');
  
  if (isExistingUsername) {
    throw new Error(`Recruiter with UserName ${recruiter.userName} already exists`);
  }

  recruiter.password=await authService.encryptPassword(recruiter.password)
  const createRecruiter = await recruiterRepository.addRecruiter(recruiter)
  return createRecruiter;
}

export const RecruiterLogin = async (
  email: string,
  password: string,
  recruiterRepository: ReturnType<RecruiterRepositoryInter>,
  authService: ReturnType<AuthServiceInter>
) => {
  const recruiter: UserInterface | any = await recruiterRepository.getRecruiterByEmail(email);

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

