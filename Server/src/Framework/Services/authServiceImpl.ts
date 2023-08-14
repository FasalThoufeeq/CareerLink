import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import configKeys from "../../config";
import crypto from "crypto";

export const authServiceImpl = () => {
  const encryptPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);
    return password;
  };

  const comparePassword = (password: string, hashedPassword: string) => {
    return bcrypt.compare(password, hashedPassword);
  };

  const generateToken = (payload: string) => {
    const token = jwt.sign(
      { userId: payload },
      configKeys.JWT_SECRET_KEY as string,
      {
        expiresIn: "5d",
      }
    );
    return token;
  };
  const verifyToken = (token: string) => {
    return jwt.verify(token, configKeys.JWT_SECRET_KEY as string);
  };

  const createResetPasswordToken = async () => {
    const resetToken = await crypto.randomBytes(32).toString("hex");
    return resetToken;
  };

  const hashResetPasswordToken = async (ResetPasswordToken: string) => {
    const hashedResetPasswordToken = await crypto
      .createHash("sha256")
      .update(ResetPasswordToken)
      .digest("hex");

    return hashedResetPasswordToken;
  };
  return {
    encryptPassword,
    comparePassword,
    generateToken,
    verifyToken,
    createResetPasswordToken,
    hashResetPasswordToken,
  };
};

export type AuthServiceImpl = typeof authServiceImpl;
export type AuthServiceImplReturn = ReturnType<AuthServiceImpl>;
