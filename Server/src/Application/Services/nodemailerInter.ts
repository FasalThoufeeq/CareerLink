import { SendEmailImplReturn } from "../../Framework/Services/nodemailerImpl";

export const SendEmailInter = (service: SendEmailImplReturn) => {
  const ResetPasswordEmail = async (email: string, resetToken: string) => {
    const sendMail = await service.ResetPasswordEmail(email, resetToken);
    return sendMail;
  };
  const InviteEmail = async (
    name: string,
    email: string,
    roomId: string,
    jobTitle: string,
    companyName: string
  ) => {
    const sendMail = await service.InviteEmail(
      name,
      email,
      roomId,
      jobTitle,
      companyName
    );
    return sendMail;
  };

  return {
    ResetPasswordEmail,
    InviteEmail
  };
};

export type SendEmailInter = typeof SendEmailInter;

export type SendEmailInterReturn = ReturnType<SendEmailInter>;
