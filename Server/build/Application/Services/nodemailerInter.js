"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendEmailInter = void 0;
const SendEmailInter = (service) => {
    const ResetPasswordEmail = async (email, resetToken) => {
        const sendMail = await service.ResetPasswordEmail(email, resetToken);
        return sendMail;
    };
    const InviteEmail = async (name, email, roomId, jobTitle, companyName) => {
        const sendMail = await service.InviteEmail(name, email, roomId, jobTitle, companyName);
        return sendMail;
    };
    return {
        ResetPasswordEmail,
        InviteEmail
    };
};
exports.SendEmailInter = SendEmailInter;
