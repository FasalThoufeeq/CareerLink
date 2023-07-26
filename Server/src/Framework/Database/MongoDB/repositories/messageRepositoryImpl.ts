import { Message } from "../models/messageModel";

export const messageRepositoryImpl = () => {
  const addMessage = async (
    chatId: string,
    senderId: string,
    message: string
  ) => {
    const newMessage = new Message({
      chatId,
      senderId,
      message,
    });
    const savedMesssage = await newMessage.save();
    return savedMesssage;
  };

  const getMessages = async (chatId: string) => {
    const messages = await Message.find({ chatId: chatId });

    return messages;
  };

  return {
    addMessage,
    getMessages,
  };
};

export type MessageRepositoryImpl = typeof messageRepositoryImpl;
