"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageRepositoryImpl = void 0;
const messageModel_1 = require("../models/messageModel");
const messageRepositoryImpl = () => {
    const addMessage = async (chatId, senderId, message) => {
        const newMessage = new messageModel_1.Message({
            chatId,
            senderId,
            message,
        });
        const savedMesssage = await newMessage.save();
        return savedMesssage;
    };
    const getMessages = async (chatId) => {
        const messages = await messageModel_1.Message.find({ chatId: chatId });
        return messages;
    };
    return {
        addMessage,
        getMessages,
    };
};
exports.messageRepositoryImpl = messageRepositoryImpl;
