import { AuthServiceImplReturn } from "../../Framework/Services/authServiceImpl";

export const authServiceInter = (service: AuthServiceImplReturn) => {
  const encryptPassword = (password: string) =>
    service.encryptPassword(password);

  const comparePassword = (password: string, hashedPassword: string) =>
    service.comparePassword(password, hashedPassword);

  const generateToken = (payload: string) => service.generateToken(payload);

  const verifyToken = (token: string) => service.verifyToken(token);

  const createResetPasswordToken = async () => {
    const resetToken = await service.createResetPasswordToken();
    return resetToken;
  };

  const hashResetPasswordToken = async (ResetPasswordToken: string) => {
    const hashedResetPasswordToken = await service.hashResetPasswordToken(
      ResetPasswordToken
    );

    return hashedResetPasswordToken;
  };
  

  return {
    encryptPassword,
    comparePassword,
    generateToken,
    verifyToken,
    createResetPasswordToken,
    hashResetPasswordToken
  };
};
export type AuthServiceInter = typeof authServiceInter;
