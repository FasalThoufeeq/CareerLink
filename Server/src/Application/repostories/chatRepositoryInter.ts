import { ChatRepositoryImpl } from "../../Framework/Database/MongoDB/repositories/chatRepositoryImpl";

export const chatRepositoryInter = (
  repository: ReturnType<ChatRepositoryImpl>
) => {
  const createChat = async (senderId: string, recieverId: string) => {
    const savedChat = await repository.createChat(senderId, recieverId);

    return savedChat;
  };

  const findChats = async (id: string) => {
    const chats = await repository.findChats(id);
    return chats;
  };

  const getChat = async (firstId: string, secondId: string) => {
    const chat = await repository.getChat(firstId, secondId);
    return chat;
  };
  return {
    createChat,
    findChats,
    getChat,
  };
};

export type ChatRepositoryInter = typeof chatRepositoryInter;
