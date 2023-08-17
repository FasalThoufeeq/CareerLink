"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InviteEmail = exports.resetPassword = exports.forgottenpassEmail = exports.UpdateCompanylogo = exports.UpdateRecruiterProfile = exports.getRecruiterProfile = exports.UpdateProfilepic = exports.UpdateProfile = exports.getProfile = exports.RecruiterLogin = exports.recruiterRegister = exports.userGoogleLogin = exports.userLogin = exports.userRegister = void 0;
const userRegister = async (user, userRepository, userProfileRepository, authService) => {
    user.email = user.email.toLocaleLowerCase();
    const isExistingEmail = await userRepository.getUserByEmail(user.email);
    if (isExistingEmail) {
        throw new Error(`User with ${user.email} already exists`);
    }
    user.password = await authService.encryptPassword(user.password);
    const profile = await userProfileRepository.addProfile(user);
    const createUser = await userRepository.addUser(user, profile._id);
    return createUser;
};
exports.userRegister = userRegister;
const userLogin = async (email, password, userRepository, authService) => {
    const user = await userRepository.getUserByEmail(email);
    if (!user) {
        throw new Error(`User not exist`);
    }
    const ispasswordCorrect = await authService.comparePassword(password, user.password);
    if (!ispasswordCorrect) {
        throw new Error(`Password incorrect`);
    }
    const profile = await userRepository.getUserProfileByEmail(email);
    const token = authService.generateToken(user._id.toString());
    return { token, user, profile };
};
exports.userLogin = userLogin;
const userGoogleLogin = async (user, userRepository, userProfileRepository, authService) => {
    const isExistingEmail = await userRepository.getUserByEmail(user.email);
    if (isExistingEmail) {
        const token = await authService.generateToken(isExistingEmail._id.toString());
        return { token, isExistingEmail };
    }
    else {
        const profile = await userProfileRepository.addProfile(user);
        const createUser = await userRepository.addUser(user, profile._id);
        const isExistingEmail = await userRepository.getUserByEmail(user.email);
        const token = await authService.generateToken(isExistingEmail._id.toString());
        return { token, isExistingEmail };
    }
};
exports.userGoogleLogin = userGoogleLogin;
const recruiterRegister = async (recruiter, recruiterRepository, recruiterProfileRepository, authService) => {
    recruiter.email = recruiter.email.toLocaleLowerCase();
    const isExistingEmail = await recruiterRepository.getRecruiterByEmail(recruiter.email);
    if (isExistingEmail) {
        throw new Error(`Recruiter with ${recruiter.email} already exists`);
    }
    const isExistingUsername = await recruiterRepository.getRecruiterByUsername(recruiter.userName);
    if (isExistingUsername) {
        throw new Error(`Recruiter with UserName ${recruiter.userName} already exists`);
    }
    recruiter.password = await authService.encryptPassword(recruiter.password);
    const recruiterProfile = await recruiterProfileRepository.addRecruiterProfile(recruiter);
    const createRecruiter = await recruiterRepository.addRecruiter(recruiter, recruiterProfile._id);
    return createRecruiter;
};
exports.recruiterRegister = recruiterRegister;
const RecruiterLogin = async (email, password, recruiterRepository, authService, recruiterProfilerepository) => {
    const recruiter = await recruiterRepository.getRecruiterByEmail(email);
    if (!recruiter) {
        throw new Error(`Recruiter not exist`);
    }
    const ispasswordCorrect = await authService.comparePassword(password, recruiter.password);
    if (!ispasswordCorrect) {
        throw new Error(`Password incorrect`);
    }
    const profile = await recruiterProfilerepository.getRecuiterProfileByEmail(email);
    const token = authService.generateToken(recruiter._id.toString());
    return { token, recruiter, profile };
};
exports.RecruiterLogin = RecruiterLogin;
const getProfile = async (profileId, userProfileRepository) => {
    return await userProfileRepository.getProfile(profileId);
};
exports.getProfile = getProfile;
const UpdateProfile = async (profileId, profile, resume, userProfileRepository) => {
    profile.resume = resume;
    const EditedProfile = await userProfileRepository.updateProfile(profileId, profile);
    return EditedProfile;
};
exports.UpdateProfile = UpdateProfile;
const UpdateProfilepic = async (profileId, profilePic, userProfileRepository) => {
    const EditedData = await userProfileRepository.updateProfilePic(profileId, profilePic);
    return EditedData;
};
exports.UpdateProfilepic = UpdateProfilepic;
const getRecruiterProfile = async (profileId, RecruiterProfileRepository) => {
    const profile = await RecruiterProfileRepository.getRecuiterProfile(profileId);
    return profile;
};
exports.getRecruiterProfile = getRecruiterProfile;
const UpdateRecruiterProfile = async (updatedProfile, profileId, RecruiterProfileRepository) => {
    const EditedProfile = await RecruiterProfileRepository.updateProfile(updatedProfile, profileId);
    return EditedProfile;
};
exports.UpdateRecruiterProfile = UpdateRecruiterProfile;
const UpdateCompanylogo = async (profileId, companylogo, RecruiterProfileRepository) => {
    const EditedProfile = await RecruiterProfileRepository.updateLogo(profileId, companylogo);
    return EditedProfile;
};
exports.UpdateCompanylogo = UpdateCompanylogo;
const forgottenpassEmail = async (email, authService, userRepository, nodemailerRepository) => {
    const user = await userRepository.getUserByEmail(email);
    if (!user) {
        throw new Error(`User with ${email} not exists`);
    }
    const resetPasswordToken = await authService.createResetPasswordToken();
    const hashResetPasswordToken = await authService.hashResetPasswordToken(resetPasswordToken);
    const passwordResetTokenExpires = new Date(Date.now() + 10 * 60 * 1000);
    const saving = await userRepository.savingResetToken(email, hashResetPasswordToken, passwordResetTokenExpires);
    await nodemailerRepository.ResetPasswordEmail(email, resetPasswordToken);
};
exports.forgottenpassEmail = forgottenpassEmail;
const resetPassword = async (resetToken, password, authService, userRepository) => {
    const hashedResetToken = await authService.hashResetPasswordToken(resetToken);
    const user = await userRepository.getUserByResetToken(hashedResetToken);
    if (!user) {
        throw new Error(`Your reset Token has expired. Please try again`);
    }
    const hashedPassword = await authService.encryptPassword(password);
    await userRepository.resetPassword(hashedResetToken, hashedPassword);
    return;
};
exports.resetPassword = resetPassword;
const InviteEmail = async (name, email, roomId, jobTitle, companyName, nodemailerRepository) => {
    await nodemailerRepository.InviteEmail(name, email, roomId, jobTitle, companyName);
    return;
};
exports.InviteEmail = InviteEmail;
