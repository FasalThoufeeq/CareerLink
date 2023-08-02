"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageRepositoryInter = void 0;
const messageRepositoryInter = (repository) => {
    const addMessage = async (chatId, senderId, message) => {
        const savedMesssage = await repository.addMessage(chatId, senderId, message);
        return savedMesssage;
    };
    const getMessages = async (chatId) => {
        const messages = await repository.getMessages(chatId);
        return messages;
    };
    return {
        addMessage,
        getMessages
    };
};
exports.messageRepositoryInter = messageRepositoryInter;
