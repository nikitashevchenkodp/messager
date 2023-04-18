import React, { FC } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { getCurrentUserId } from 'store/selectors';
import { ReactionAvatar, ReactionButton, ReactionsContainer } from './styled';

export interface IReaction {
  _id: string;
  reaction: string;
  by: {
    id: string;
    fullName: string;
    avatar: string;
  };
}

interface IReactionsProps {
  reactions?: IReaction[];
  type: 'sent' | 'recieved';
  messageId: string;
  chatId: string;
}

interface TransformedReaction {
  _id: string;
  reaction: string;
  by: {
    id: string;
    fullName: string;
    avatar: string;
  }[];
}

const Reactions: FC<IReactionsProps> = ({ reactions, type, messageId, chatId }) => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector(getCurrentUserId);

  const deleteReaction = (delReaction: TransformedReaction) => {
    if (!delReaction.by.find((user) => user.id === userId)) return;
    const deletedReaction = reactions?.find(
      (reaction) => reaction.by.id === userId && reaction.reaction === delReaction.reaction
    );
    if (deletedReaction) {
      dispatch({
        type: 'deleteReaction',
        payload: { reactionId: deletedReaction._id, messageId, chatId }
      });
    }
  };

  const transformReactions = (reactions?: IReaction[]): TransformedReaction[] | undefined => {
    if (!reactions?.length) return;
    const ht = {} as Record<string, { id: string; fullName: string; avatar: string }[]>;
    for (const reaction of reactions) {
      const current = reaction.reaction;
      if (ht[current]) ht[current].push(reaction.by);
      else ht[current] = [reaction.by];
    }

    const newReactions = reactions.map((reaction) => {
      const currentReaction = reaction.reaction;
      return {
        ...reaction,
        by: ht[currentReaction]
      };
    });

    const resultIds = new Set();

    const result = newReactions.filter((reaction) => {
      const currentReaction = reaction.reaction;
      const isDublicate = resultIds.has(currentReaction);
      resultIds.add(currentReaction);
      if (isDublicate) return false;
      return true;
    });

    return result;
  };

  return (
    <ReactionsContainer data-testid="message-reactions">
      {transformReactions(reactions)?.map((reaction) => (
        <ReactionButton
          data-testid={`reaction-btn${reaction._id}`}
          key={reaction._id}
          messageType={type}
          onClick={() => deleteReaction(reaction)}>
          <div>{reaction.reaction}</div>
          <div style={{ display: 'flex' }}>
            {reaction.by.map((user) => (
              <ReactionAvatar
                data-testid={`reaction-avatar${user.id}`}
                key={user.id}
                src={user.avatar}
                fullName={user.fullName}
              />
            ))}
          </div>
        </ReactionButton>
      ))}
    </ReactionsContainer>
  );
};

export default Reactions;
