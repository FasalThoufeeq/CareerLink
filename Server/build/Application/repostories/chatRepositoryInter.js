"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatRepositoryInter = void 0;
const chatRepositoryInter = (repository) => {
    const createChat = async (senderId, recieverId) => {
        const savedChat = await repository.createChat(senderId, recieverId);
        return savedChat;
    };
    const findChats = async (id) => {
        const chats = await repository.findChats(id);
        return chats;
    };
    const getChat = async (firstId, secondId) => {
        const chat = await repository.getChat(firstId, secondId);
        return chat;
    };
    return {
        createChat,
        findChats,
        getChat,
    };
};
exports.chatRepositoryInter = chatRepositoryInter;
