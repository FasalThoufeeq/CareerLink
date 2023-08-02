import nodemailer, { Transporter } from "nodemailer";
import configKeys from "../../config";
export const SendEmailImpl = () => {
  const ResetPasswordEmail = (email: string,resetToken:string) => {
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
      return new Promise(async(resolve, reject) => {
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
  };
};

export type SendEmailImpl = typeof SendEmailImpl;

export type SendEmailImplReturn = ReturnType<SendEmailImpl>;
