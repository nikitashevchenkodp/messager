import { log } from 'console';
import { IMessage } from 'store/interfaces';

type GroupedMessages = {
  [date: string]: Array<IMessage[]>;
};

export const groupMessages = (messages: { [id: string]: IMessage }, messagesIds: string[]) => {
  const messagesByDateGroup = {} as { [date: string]: IMessage[] };
  for (let i = 0; i < messagesIds.length; i++) {
    const currentMessage = messages[messagesIds[i]];
    const currentMessageDate = new Date(currentMessage?.createdAt).toLocaleDateString();
    messagesByDateGroup[new Date(currentMessage.createdAt).toISOString()] = [currentMessage];
    while (
      messagesIds[i + 1] &&
      currentMessageDate === new Date(messages[messagesIds[i + 1]].createdAt).toLocaleDateString()
    ) {
      messagesByDateGroup[new Date(currentMessage?.createdAt).toISOString()].push(
        messages[messagesIds[i + 1]]
      );
      i++;
    }
  }
  const groupedByDateAndSender = {} as GroupedMessages;
  let firstUnreadId = '';

  for (const date in messagesByDateGroup) {
    const current = messagesByDateGroup[date];
    const groupedBySenderGroups = [] as IMessage[][];
    for (let i = 0; i < current.length; i++) {
      if (current[i].readed === false && !firstUnreadId) {
        firstUnreadId = String(current[i].id);
      }
      const group = [current[i]] as IMessage[];
      while (
        current[i + 1] &&
        (current[i] as IMessage).from.id === (current[i + 1] as IMessage).from.id
      ) {
        if (current[i].readed === false && !firstUnreadId) {
          firstUnreadId = String(current[i].id);
        }
        group.push(current[i + 1] as IMessage);
        i++;
      }

      groupedBySenderGroups.push(group);
    }
    groupedByDateAndSender[date] = groupedBySenderGroups;
  }

  return { firstUnreadId, groupedByDateAndSender };
};
