"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const message_1 = require("../../Application/useCases/Message/message");
const messageController = (messageRepositoryImpl, messageRepositoryInter) => {
    const messageRepository = messageRepositoryInter(messageRepositoryImpl());
    const addingMessage = (0, express_async_handler_1.default)(async (req, res) => {
        const { chatId, senderId, message } = req.body;
        const savedMessage = await (0, message_1.addMessage)(chatId, senderId, message, messageRepository);
        res.json({
            status: "success",
            message: "message Added successfully",
            savedMessage,
        });
    });
    const gettingMessages = (0, express_async_handler_1.default)(async (req, res) => {
        const { chatId } = req.params;
        const messages = await (0, message_1.getMessages)(chatId, messageRepository);
        res.json({
            status: "success",
            message: "fetched messages succesfully",
            messages,
        });
    });
    return {
        addingMessage,
        gettingMessages,
    };
};
exports.default = messageController;
