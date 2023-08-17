"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserProfile = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userProfileSchema = new mongoose_1.default.Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
    },
    phoneNumber: {
        type: String,
    },
    profilePicture: {
        type: String,
    },
    education: {
        type: String,
    },
    languages: {
        type: [String],
        default: [],
    },
    resume: {
        type: String,
    },
    experience: {
        type: String,
    },
    skills: {
        type: [String],
        default: [],
    },
    appliedJobs: {
        type: [
            {
                _id: {
                    type: String,
                    ref: "Job",
                },
                status: {
                    type: String,
                    default: "pending",
                },
            },
        ],
        ref: "Job",
    },
    notifications: {
        type: [
            {
                notification: {
                    type: String,
                },
                notificationSummary: {
                    type: String,
                },
            },
        ],
    },
});
exports.UserProfile = mongoose_1.default.model("UserProfile", userProfileSchema);
