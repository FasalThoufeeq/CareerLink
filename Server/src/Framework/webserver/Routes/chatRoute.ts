import express from "express";
import chatController from "../../../Adapters/ChatController/chatController";
import { chatRepositoryImpl } from "../../Database/MongoDB/repositories/chatRepositoryImpl";
import { chatRepositoryInter } from "../../../Application/repostories/chatRepositoryInter";

const chatRoute = () => {
  const router = express.Router();
  const controller = chatController(chatRepositoryImpl, chatRepositoryInter);

  router.post("/", controller.creatingChat);

  router.get("/:id", controller.findingChats);

  router.get('/find/:firstId/:secondId',controller.gettingChat)
  
  return router;
};

export default chatRoute;
