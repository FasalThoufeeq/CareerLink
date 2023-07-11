import { UserRepositoryImpl } from "../../Framework/Database/MongoDB/repositories/userRepositoryImpl";
import { GoogleUserInteface } from "../../Types/userGoogleInterface";
import { UserInterface } from "../../Types/userInterface";

export const userRepositoryInter = (
  repository: ReturnType<UserRepositoryImpl>
) => {
  const getUserByEmail = async (email: string) => {
    return repository.getUserByEmail(email);
  };

  const addUser = async (user: UserInterface|GoogleUserInteface) => {
    return repository.addUser(user);
  };

  return {
    getUserByEmail,
    addUser,
  };
};

export type UserRepositoryInter= typeof userRepositoryInter
