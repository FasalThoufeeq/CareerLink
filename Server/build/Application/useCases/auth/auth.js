"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecruiterLogin = exports.recruiterRegister = exports.userGoogleLogin = exports.userLogin = exports.userRegister = void 0;
const userRegister = async (user, userRepository, authService) => {
    console.log("eeeee");
    user.email = user.email.toLocaleLowerCase();
    const isExistingEmail = await userRepository.getUserByEmail(user.email);
    if (isExistingEmail) {
        throw new Error(`User with ${user.email} already exists`);
    }
    user.password = await authService.encryptPassword(user.password);
    const createUser = await userRepository.addUser(user);
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
    const token = authService.generateToken(user._id.toString());
    return { token, user };
};
exports.userLogin = userLogin;
const userGoogleLogin = async (user, userRepository, authService) => {
    const isExistingEmail = await userRepository.getUserByEmail(user.email);
    if (isExistingEmail) {
        const token = await authService.generateToken(isExistingEmail._id.toString());
        return { token, isExistingEmail };
    }
    else {
        const createUser = await userRepository.addUser(user);
        const isExistingEmail = await userRepository.getUserByEmail(user.email);
        console.log(isExistingEmail, "haaaaavooooo");
        const token = await authService.generateToken(isExistingEmail._id.toString());
        return { token, isExistingEmail };
    }
};
exports.userGoogleLogin = userGoogleLogin;
const recruiterRegister = async (recruiter, recruiterRepository, authService) => {
    recruiter.email = recruiter.email.toLocaleLowerCase();
    const isExistingEmail = await recruiterRepository.getRecruiterByEmail(recruiter.email);
    if (isExistingEmail) {
        throw new Error(`Recruiter with ${recruiter.email} already exists`);
    }
    const isExistingUsername = await recruiterRepository.getRecruiterByUsername(recruiter.userName);
    console.log(isExistingUsername, 'aaaaaaa');
    if (isExistingUsername) {
        throw new Error(`Recruiter with UserName ${recruiter.userName} already exists`);
    }
    recruiter.password = await authService.encryptPassword(recruiter.password);
    const createRecruiter = await recruiterRepository.addRecruiter(recruiter);
    return createRecruiter;
};
exports.recruiterRegister = recruiterRegister;
const RecruiterLogin = async (email, password, recruiterRepository, authService) => {
    const recruiter = await recruiterRepository.getRecruiterByEmail(email);
    if (!recruiter) {
        throw new Error(`Recruiter not exist`);
    }
    const ispasswordCorrect = await authService.comparePassword(password, recruiter.password);
    if (!ispasswordCorrect) {
        throw new Error(`Password incorrect`);
    }
    const token = authService.generateToken(recruiter._id.toString());
    return { token, recruiter };
};
exports.RecruiterLogin = RecruiterLogin;
