import { SendEmailImplReturn } from "../../Framework/Services/nodemailerImpl";

export const SendEmailInter = (service: SendEmailImplReturn) => {
  const ResetPasswordEmail = async (email: string, resetToken: string) => {
    const sendMail = await service.ResetPasswordEmail(email, resetToken);
    return sendMail;
  };

  return {
    ResetPasswordEmail,
  };
};

export type SendEmailInter = typeof SendEmailInter;

export type SendEmailInterReturn = ReturnType<SendEmailInter>;
