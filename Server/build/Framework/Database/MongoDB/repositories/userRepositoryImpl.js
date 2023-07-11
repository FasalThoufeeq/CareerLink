"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepositoryImpl = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const userRepositoryImpl = () => {
    const getUserByEmail = async (email) => {
        const user = await userModel_1.default.findOne({ email: email });
        return user;
    };
    const addUser = async (user) => {
        const newUser = new userModel_1.default(user);
        const savedUser = await newUser.save();
        console.log(savedUser, 'saved');
        return savedUser;
    };
    return {
        getUserByEmail,
        addUser,
    };
};
exports.userRepositoryImpl = userRepositoryImpl;
