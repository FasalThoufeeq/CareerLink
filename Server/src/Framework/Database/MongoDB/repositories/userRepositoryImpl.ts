import { GoogleUserInteface } from "../../../../Types/userGoogleInterface";
import { UserInterface } from "../../../../Types/userInterface";
import User from "../models/userModel";
import { UserProfile } from "../models/userProfileModel";

export const userRepositoryImpl = () => {
  const getUserByEmail = async (email: string) => {
    const user: UserInterface | null = await User.findOne({ email: email });
    return user;
  };
  const getUserProfileByEmail = async (email: string) => {
    return await UserProfile.findOne({ email: email });
  };
  const addUser = async (
    user: UserInterface | GoogleUserInteface,
    profileId: any
  ) => {
    const newUser: any = new User(user);
    newUser.profileId = profileId;
    const savedUser = await newUser.save();
    console.log(savedUser, "saved");
    return savedUser;
  };

  return {
    getUserByEmail,
    addUser,
    getUserProfileByEmail
  };
};

export type UserRepositoryImpl = typeof userRepositoryImpl;
