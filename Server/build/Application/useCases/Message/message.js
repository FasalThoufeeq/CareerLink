"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMessages = exports.addMessage = void 0;
const addMessage = async (chatId, senderId, message, repository) => {
    const savedMessage = await repository.addMessage(chatId, senderId, message);
    return savedMessage;
};
exports.addMessage = addMessage;
const getMessages = async (chatId, repository) => {
    const messages = await repository.getMessages(chatId);
    return messages;
};
exports.getMessages = getMessages;
