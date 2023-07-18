import { UserRepositoryImpl } from "../../Framework/Database/MongoDB/repositories/userRepositoryImpl";
import { GoogleUserInteface } from "../../Types/userGoogleInterface";
import { UserInterface } from "../../Types/userInterface";

export const userRepositoryInter = (
  repository: ReturnType<UserRepositoryImpl>
) => {
  const getUserByEmail = async (email: string) => {
    return repository.getUserByEmail(email);
  };

  const getUserProfileByEmail = async(email: string) => {
    return await repository.getUserProfileByEmail(email);
  };
  const addUser = async (
    user: UserInterface | GoogleUserInteface,
    profileId: any
  ) => {
    return repository.addUser(user, profileId);
  };

  return {
    getUserByEmail,
    addUser,
    getUserProfileByEmail
  };
};

export type UserRepositoryInter = typeof userRepositoryInter;
