import { MessageRepositoryImpl } from "../../Framework/Database/MongoDB/repositories/messageRepositoryImpl";

export const messageRepositoryInter = (
  repository: ReturnType<MessageRepositoryImpl>
) => {
  const addMessage = async (
    chatId: string,
    senderId: string,
    message: string
  ) => {
    const savedMesssage = await repository.addMessage(
      chatId,
      senderId,
      message
    );
    return savedMesssage;
  };

  const getMessages = async (chatId: string) => {
    const messages = await repository.getMessages(chatId);

    return messages;
  };

  return {
    addMessage,
    getMessages
  };
};

export type MessageRepositoryInter = typeof messageRepositoryInter;
