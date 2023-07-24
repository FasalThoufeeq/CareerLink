import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

const chatController = () => {
  const createChat = asyncHandler(async (req: Request, res: Response) => {
    const {senderId} = req.body;
    const {recieverId} = req.body;

  });
  return {
    createChat,
  };
};

export default chatController;
