"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatRepositoryImpl = void 0;
const chatModel_1 = require("../models/chatModel");
const chatRepositoryImpl = () => {
    const createChat = async (senderId, recieverId) => {
        try {
            const existingChat = await chatModel_1.Chat.findOne({
                members: { $all: [senderId, recieverId] },
            });
            if (existingChat) {
                return existingChat;
            }
            const newChat = new chatModel_1.Chat({
                members: [senderId, recieverId],
            });
            const savedChat = await newChat.save();
            return savedChat;
        }
        catch (error) {
            throw error;
        }
    };
    const findChats = async (id) => {
        const chats = await chatModel_1.Chat.find({ members: { $in: [id] } });
        return chats;
    };
    const getChat = async (firstId, secondId) => {
        const chat = await chatModel_1.Chat.find({
            members: { $all: [firstId, secondId] },
        });
        return chat;
    };
    return {
        createChat,
        findChats,
        getChat
    };
};
exports.chatRepositoryImpl = chatRepositoryImpl;
