"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecruiterProfile = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const recruiterProfileSchema = new mongoose_1.default.Schema({
    companyName: {
        type: String,
    },
    userName: {
        type: String,
        unique: true,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    phoneNumber: {
        type: String,
    },
    companyAddress: {
        type: String,
    },
    companySize: {
        type: Number,
    },
    industry: {
        type: String,
    },
    about: {
        type: String,
    },
    companylogo: {
        type: String, // Store the path or URL of the logo image
    },
}, { timestamps: true });
exports.RecruiterProfile = mongoose_1.default.model('RecruiterProfile', recruiterProfileSchema);
