import { ChatRepositoryInter } from "../../repostories/chatRepositoryInter";

export const createChat = async (
  senderId: string,
  recieverId: string,
  repository: ReturnType<ChatRepositoryInter>
) => {
  const savedChat = await repository.createChat(senderId, recieverId);
  return savedChat;
};

export const findChats = async (
  id: string,
  repository: ReturnType<ChatRepositoryInter>
) => {
  const chats = await repository.findChats(id);
  return chats;
};

export const getchat = (
  firstId: string,
  secondId: string,
  repository: ReturnType<ChatRepositoryInter>
) => {
    const chat=repository.getChat(firstId, secondId);
    return chat;
};
