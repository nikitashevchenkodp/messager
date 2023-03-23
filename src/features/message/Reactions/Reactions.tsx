import Avatar from 'components/Avatar';
import React, { FC } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { ReactionButton, ReactionsContainer } from './styled';

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

const Reactions: FC<IReactionsProps> = ({ reactions, type, messageId, chatId }) => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.authentication.user._id);

  const deleteReaction = (reaction: IReaction) => {
    if (reaction.by.id !== userId) return;
    dispatch({ type: 'deleteReaction', payload: { reactionId: reaction._id, messageId, chatId } });
  };

  return (
    <ReactionsContainer>
      {reactions?.map((reaction) => (
        <ReactionButton
          key={reaction._id}
          messageType={type}
          onClick={() => deleteReaction(reaction)}>
          <div>{reaction.reaction}</div>
          <div>
            <Avatar
              src={reaction.by.avatar}
              fullName={reaction.by.fullName}
              styles={{ width: '20px', height: '20px', fontSize: '10px' }}
            />
          </div>
        </ReactionButton>
      ))}
    </ReactionsContainer>
  );
};

export default Reactions;
