import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import {
  createChat,
  findChats,
  getchat,
} from "../../Application/useCases/chat/chat";
import { ChatRepositoryImpl } from "../../Framework/Database/MongoDB/repositories/chatRepositoryImpl";
import { ChatRepositoryInter } from "../../Application/repostories/chatRepositoryInter";

const chatController = (
  chatRepositoryImpl: ChatRepositoryImpl,
  chatRepositoryInter: ChatRepositoryInter
) => {
  const chatRepository = chatRepositoryInter(chatRepositoryImpl());
  const creatingChat = asyncHandler(async (req: Request, res: Response) => {
    const { senderId } = req.body;
    const { recieverId } = req.body;

    const savedChat = await createChat(senderId, recieverId, chatRepository);
    res.json({
      status: "success",
      message: "saved chat successfully",
      savedChat,
    });
  });

  const findingChats = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const chats = await findChats(id, chatRepository);
    res.json({
      status: "success",
      message: "chats fetched successfully",
      chats,
    });
  });

  const gettingChat = asyncHandler(async (req: Request, res: Response) => {
    const { firstId } = req.params;
    const { secondId } = req.params;
    const chat = await getchat(firstId, secondId, chatRepository);

    res.json({
        status:"success",
        message:"fetched chat successfully",
        chat
    })
  });
  return {
    creatingChat,
    findingChats,
    gettingChat
  };
};

export default chatController;
