"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const messageController_1 = __importDefault(require("../../../Adapters/MessageController/messageController"));
const messageRepositoryImpl_1 = require("../../Database/MongoDB/repositories/messageRepositoryImpl");
const messageRepositoryInter_1 = require("../../../Application/repostories/messageRepositoryInter");
const messageRoute = () => {
    const router = express_1.default.Router();
    const controller = (0, messageController_1.default)(messageRepositoryImpl_1.messageRepositoryImpl, messageRepositoryInter_1.messageRepositoryInter);
    router.post('/', controller.addingMessage);
    router.get('/:chatId', controller.gettingMessages);
    return router;
};
exports.default = messageRoute;
