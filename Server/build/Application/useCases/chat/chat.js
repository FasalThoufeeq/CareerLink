"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getchat = exports.findChats = exports.createChat = void 0;
const createChat = async (senderId, recieverId, repository) => {
    const savedChat = await repository.createChat(senderId, recieverId);
    return savedChat;
};
exports.createChat = createChat;
const findChats = async (id, repository) => {
    const chats = await repository.findChats(id);
    return chats;
};
exports.findChats = findChats;
const getchat = (firstId, secondId, repository) => {
    const chat = repository.getChat(firstId, secondId);
    return chat;
};
exports.getchat = getchat;
