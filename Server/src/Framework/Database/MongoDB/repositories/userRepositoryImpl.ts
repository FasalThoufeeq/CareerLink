import { GoogleUserInteface } from "../../../../Types/userGoogleInterface";
import { UserInterface } from "../../../../Types/userInterface";
import User from "../models/userModel";

export const userRepositoryImpl = () => {
  const getUserByEmail = async (email: string) => {
    const user: UserInterface | null = await User.findOne({ email: email });
    return user;
  };

  const addUser = async (user: UserInterface|GoogleUserInteface) => {
    const newUser: any = new User(user);
    const savedUser= await newUser.save();
    console.log(savedUser,'saved');
    return savedUser
    
  };

  return {
    getUserByEmail,
    addUser,
  };
};

export type UserRepositoryImpl = typeof userRepositoryImpl;
