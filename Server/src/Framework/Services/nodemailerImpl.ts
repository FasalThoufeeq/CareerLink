import nodemailer, { Transporter } from "nodemailer";
import configKeys from "../../config";
export const SendEmailImpl = () => {
  const ResetPasswordEmail = (email: string, resetToken: string) => {
    try {
      const transporter: Transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 465,
        auth: {
          user: configKeys.EMAIL, // Your email address
          pass: configKeys.EMAIL_PASSWORD, // Your email password
        },
      });

      const mailOptions = {
        from: configKeys.EMAIL, // Sender email address
        to: email, // Recipient email address
        subject: "Password Reset Verification",
        html: `<p>Hi,</p>
                <p>We have received a password reset request. Please use the below link to reset your password</p>
                <a href=http://localhost:5173/reset_password?resetToken=${resetToken}>Click here to recover</a>
                <p>This reset password link will be valid only 10 minutes</p>`,
      };
      return new Promise(async (resolve, reject) => {
        await transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error("Error sending email:", error);
            reject(error); // Reject the promise with the error
          } else {
            console.log("Email sent:", info.response);
            resolve(true); // Resolve the promise with the desired value
          }
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  const InviteEmail = (
    name: string,
    email: string,
    roomId: string,
    jobTitle: string,
    companyName: string
  ) => {
    try {
      const transporter: Transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 465,
        auth: {
          user: configKeys.EMAIL, // Your email address
          pass: configKeys.EMAIL_PASSWORD, // Your email password
        },
      });

      const mailOptions = {
        from: configKeys.EMAIL, // Sender email address
        to: email, // Recipient email address
        subject: "Interview Invitation",
        html: `<p>Hi ${name},</p>
        <p>We are excited to inform you that your application for the ${jobTitle} position at ${companyName} has been reviewed and we are impressed with your qualifications and experience.</p> 
        <p>We would like to invite you for an interview to further discuss your potential fit for our team.</p>
        <a href=http://localhost:5173/room/${roomId}>Click here to join</a>`,
      };
      return new Promise(async (resolve, reject) => {
        await transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error("Error sending email:", error);
            reject(error); // Reject the promise with the error
          } else {
            console.log("Email sent:", info.response);
            resolve(true); // Resolve the promise with the desired value
          }
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  return {
    ResetPasswordEmail,
    InviteEmail,
  };
};

export type SendEmailImpl = typeof SendEmailImpl;

export type SendEmailImplReturn = ReturnType<SendEmailImpl>;
