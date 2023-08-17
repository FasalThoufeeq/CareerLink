"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendEmailImpl = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = __importDefault(require("../../config"));
const SendEmailImpl = () => {
    const ResetPasswordEmail = (email, resetToken) => {
        try {
            const transporter = nodemailer_1.default.createTransport({
                service: "gmail",
                host: "smtp.gmail.com",
                port: 465,
                auth: {
                    user: config_1.default.EMAIL,
                    pass: config_1.default.EMAIL_PASSWORD, // Your email password
                },
            });
            const mailOptions = {
                from: config_1.default.EMAIL,
                to: email,
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
                    }
                    else {
                        console.log("Email sent:", info.response);
                        resolve(true); // Resolve the promise with the desired value
                    }
                });
            });
        }
        catch (error) {
            console.log(error);
        }
    };
    const InviteEmail = (name, email, roomId, jobTitle, companyName) => {
        try {
            const transporter = nodemailer_1.default.createTransport({
                service: "gmail",
                host: "smtp.gmail.com",
                port: 465,
                auth: {
                    user: config_1.default.EMAIL,
                    pass: config_1.default.EMAIL_PASSWORD, // Your email password
                },
            });
            const mailOptions = {
                from: config_1.default.EMAIL,
                to: email,
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
                    }
                    else {
                        console.log("Email sent:", info.response);
                        resolve(true); // Resolve the promise with the desired value
                    }
                });
            });
        }
        catch (error) {
            console.log(error);
        }
    };
    return {
        ResetPasswordEmail,
        InviteEmail,
    };
};
exports.SendEmailImpl = SendEmailImpl;
