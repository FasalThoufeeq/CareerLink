"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const chatController_1 = __importDefault(require("../../../Adapters/ChatController/chatController"));
const chatRepositoryImpl_1 = require("../../Database/MongoDB/repositories/chatRepositoryImpl");
const chatRepositoryInter_1 = require("../../../Application/repostories/chatRepositoryInter");
const chatRoute = () => {
    const router = express_1.default.Router();
    const controller = (0, chatController_1.default)(chatRepositoryImpl_1.chatRepositoryImpl, chatRepositoryInter_1.chatRepositoryInter);
    router.post("/", controller.creatingChat);
    router.get("/:id", controller.findingChats);
    router.get('/find/:firstId/:secondId', controller.gettingChat);
    return router;
};
exports.default = chatRoute;
