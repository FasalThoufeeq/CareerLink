import { Chat } from "../models/chatModel";

export const chatRepositoryImpl = () => {
  const createChat = async (senderId: string, recieverId: string) => {
    try {
      const existingChat = await Chat.findOne({
        members: { $all: [senderId, recieverId] },
      });

      if (existingChat) {
        return existingChat;
      }
      const newChat = new Chat({
        members: [senderId, recieverId],
      });

      const savedChat = await newChat.save();

      return savedChat;
    } catch (error) {
      throw error;
    }
  };
  const findChats = async (id: string) => {
    const chats = await Chat.find({ members: { $in: [id] } });
    return chats;
  };

  const getChat = async (firstId: string, secondId: string) => {
    const chat = await Chat.find({
      members: { $all: [firstId, secondId] },
    });

    return chat
  };
  return {
    createChat,
    findChats,
    getChat
  };
};

export type ChatRepositoryImpl = typeof chatRepositoryImpl;
