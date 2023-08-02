import { UserRepositoryImpl } from "../../Framework/Database/MongoDB/repositories/userRepositoryImpl";
import { GoogleUserInteface } from "../../Types/userGoogleInterface";
import { UserInterface } from "../../Types/userInterface";

export const userRepositoryInter = (
  repository: ReturnType<UserRepositoryImpl>
) => {
  const getUserByEmail = async (email: string) => {
    return repository.getUserByEmail(email);
  };

  const getUserProfileByEmail = async (email: string) => {
    return await repository.getUserProfileByEmail(email);
  };
  const addUser = async (
    user: UserInterface | GoogleUserInteface,
    profileId: any
  ) => {
    return repository.addUser(user, profileId);
  };

  const savingResetToken = async (
    email: string,
    hashedResetPasswordToken: string,
    resetPasswordTokenExpires: Date
  ) => {
    const saving = await repository.savingResetToken(
      email,
      hashedResetPasswordToken,
      resetPasswordTokenExpires
    );
    return saving;
  };

  const getUserByResetToken = async (resetToken: string) => {
    const user: UserInterface | null = await repository.getUserByResetToken(
      resetToken
    );
    return user;
  };

  const resetPassword = async (resetToken: string, password: string) => {
    return await repository.resetPassword(resetToken, password);
  };

  return {
    getUserByEmail,
    addUser,
    getUserProfileByEmail,
    savingResetToken,
    getUserByResetToken,
    resetPassword
  };
};

export type UserRepositoryInter = typeof userRepositoryInter;
