import express from "express";
import messageController from "../../../Adapters/MessageController/messageController";
import { messageRepositoryImpl } from "../../Database/MongoDB/repositories/messageRepositoryImpl";
import { messageRepositoryInter } from "../../../Application/repostories/messageRepositoryInter";

const messageRoute = () => {
  const router = express.Router();
  const controller = messageController(
    messageRepositoryImpl,
    messageRepositoryInter
  );

  router.post('/',controller.addingMessage)

  router.get('/:chatId',controller.gettingMessages)

  return router;
};

export default messageRoute;
