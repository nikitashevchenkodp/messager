//ChatService.createMessage
//1. Получаем с клиента объект с сообщением
export interface MessageFromClient {
  content: {
    text: string;
  };
  from: {
    id: string;
    fullName: string;
    avatar: string;
  };
  chatId: string;
}
//2. If "chatId" isUserId() => transform "chatId" and "from.id" to "internalChatId";
//         If this "internalChatId" exists
//            createMessage with data from client, and add "internalChatId"
//         Else
//            Create new Chat using {chatId, from.id} from client data
//            then create message with this new "chatId"
//3. If "chatId" !isUserId
//    Basically, if it is groupChat or channel this chatId already exists, so we dont need to
//    check existing of this chat.
//    Because you cannot find and write message in group chat that does not exist
//
//        Just createMessage with data from client, and add "chatId"
//
//
//
///
//
//
//
//
//
//
