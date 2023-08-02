"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const messageSchema = new mongoose_1.default.Schema({
    chatId: {
        type: String,
    },
    senderId: {
        type: String,
    },
    message: {
        type: String,
    },
}, {
    timestamps: true,
});
exports.Message = mongoose_1.default.model("Message", messageSchema);
