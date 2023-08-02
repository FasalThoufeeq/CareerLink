"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const chat_1 = require("../../Application/useCases/chat/chat");
const chatController = (chatRepositoryImpl, chatRepositoryInter) => {
    const chatRepository = chatRepositoryInter(chatRepositoryImpl());
    const creatingChat = (0, express_async_handler_1.default)(async (req, res) => {
        const { senderId } = req.body;
        const { recieverId } = req.body;
        const savedChat = await (0, chat_1.createChat)(senderId, recieverId, chatRepository);
        res.json({
            status: "success",
            message: "saved chat successfully",
            savedChat,
        });
    });
    const findingChats = (0, express_async_handler_1.default)(async (req, res) => {
        const { id } = req.params;
        const chats = await (0, chat_1.findChats)(id, chatRepository);
        res.json({
            status: "success",
            message: "chats fetched successfully",
            chats,
        });
    });
    const gettingChat = (0, express_async_handler_1.default)(async (req, res) => {
        const { firstId } = req.params;
        const { secondId } = req.params;
        const chat = await (0, chat_1.getchat)(firstId, secondId, chatRepository);
        res.json({
            status: "success",
            message: "fetched chat successfully",
            chat
        });
    });
    return {
        creatingChat,
        findingChats,
        gettingChat
    };
};
exports.default = chatController;
