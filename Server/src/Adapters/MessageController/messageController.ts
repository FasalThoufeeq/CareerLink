import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { MessageRepositoryImpl } from "../../Framework/Database/MongoDB/repositories/messageRepositoryImpl";
import { MessageRepositoryInter } from "../../Application/repostories/messageRepositoryInter";
import {
  addMessage,
  getMessages,
} from "../../Application/useCases/Message/message";

const messageController = (
  messageRepositoryImpl: MessageRepositoryImpl,
  messageRepositoryInter: MessageRepositoryInter
) => {
  const messageRepository = messageRepositoryInter(messageRepositoryImpl());
  const addingMessage = asyncHandler(async (req: Request, res: Response) => {
    const { chatId, senderId, message } = req.body;
    const savedMessage = await addMessage(
      chatId,
      senderId,
      message,
      messageRepository
    );

    res.json({
      status: "success",
      message: "message Added successfully",
      savedMessage,
    });
  });

  const gettingMessages = asyncHandler(async (req: Request, res: Response) => {
    const { chatId } = req.params;

    const messages = await getMessages(chatId, messageRepository);

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

export default messageController;
