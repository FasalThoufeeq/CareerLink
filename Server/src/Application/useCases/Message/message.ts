import { MessageRepositoryInter } from "../../repostories/messageRepositoryInter";

export const addMessage = async (
  chatId: string,
  senderId: string,
  message: string,
  repository: ReturnType<MessageRepositoryInter>
) => {
  const savedMessage = await repository.addMessage(chatId, senderId, message);
  return savedMessage;
};

export const getMessages = async (
  chatId: string,
  repository: ReturnType<MessageRepositoryInter>
) => {
  const messages = await repository.getMessages(chatId);
  return messages;
};
