import Avatar from 'components/Avatar';
import React, { FC } from 'react';
import { ReactionButton, ReactionsContainer } from './styled';

export interface IReaction {
  reaction: string;
  by: {
    userId: string;
    fullName: string;
    avatar: string;
  };
}

interface IReactionsProps {
  reactions?: IReaction[];
  type: 'sent' | 'recieved';
}

const Reactions: FC<IReactionsProps> = ({ reactions, type }) => {
  return (
    <ReactionsContainer>
      {reactions?.map((reaction, i) => (
        <ReactionButton key={i} messageType={type}>
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
