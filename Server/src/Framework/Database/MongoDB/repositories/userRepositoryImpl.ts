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
    return savedUser;
  };

  const savingResetToken = async (
    email: string,
    hashedResetPasswordToken: string,
    resetPasswordTokenExpires: Date
  ) => {
    const saving = await User.findOneAndUpdate(
      { email: email },
      {
        $set: {
          passwordResetToken: hashedResetPasswordToken,
          passwordResetTokenExpires: resetPasswordTokenExpires,
        },
      },
      { new: true }
    );
    return saving;
  };

  const getUserByResetToken = async (resetToken: string) => {
    const user: UserInterface | null = await User.findOne({
      passwordResetToken: resetToken,
      passwordResetTokenExpires: { $gt: Date.now() },
    });
    return user;
  };

  const resetPassword = async (resetToken: string, password: string) => {
    await User.findOneAndUpdate(
      { passwordResetToken: resetToken },
      {
        $set: {
          password: password,
          passwordResetToken: null,
          passwordResetTokenExpires: null,
        },
      },
      { new: true }
    );

    return
  };

  return {
    getUserByEmail,
    addUser,
    getUserProfileByEmail,
    savingResetToken,
    getUserByResetToken,
    resetPassword,
  };
};

export type UserRepositoryImpl = typeof userRepositoryImpl;
