"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.set('strictQuery', true);
const connectDB = async () => {
    try {
        // if (!configKeys.MONGODB_URL) {
        //   throw new Error("MongoDB URL is not defined in configKeys");
        // }
        await mongoose_1.default.connect("mongodb+srv://fasaltq681:Fasal123@careerlink.mhwif17.mongodb.net/", {});
        console.log(`Database connected successfully`);
    }
    catch (error) {
        console.log(error);
        process.exit(1);
    }
};
exports.default = connectDB;
