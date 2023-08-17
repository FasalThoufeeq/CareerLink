"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("../../../config"));
mongoose_1.default.set('strictQuery', true);
const connectDB = async () => {
    try {
        if (!config_1.default.MONGODB_URL) {
            throw new Error("MongoDB URL is not defined in configKeys");
        }
        await mongoose_1.default.connect(config_1.default.MONGODB_URL, {});
        console.log(`Database connected successfully`);
    }
    catch (error) {
        console.log(error);
        process.exit(1);
    }
};
exports.default = connectDB;
