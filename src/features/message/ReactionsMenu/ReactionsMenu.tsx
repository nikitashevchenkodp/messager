import React, { FC, useMemo } from 'react';
import { useAppSelector } from 'store/hooks';
import { IReaction } from '../Reactions/Reactions';
import { ReactionItem, Reactions } from './styled';

interface IReactionsMenuProps {
  addReaction: (e: React.MouseEvent) => void;
  alreadeMadeReactions?: IReaction[];
}

const reactions = ['🤪', '😀', '😂', '💋', '🇺🇦', '🧠', '💐', '🥹', '🥳', '❤️', '❤️‍🩹', '🥟', '🥫'];

const ReactionsMenu: FC<IReactionsMenuProps> = ({ addReaction, alreadeMadeReactions }) => {
  console.log(alreadeMadeReactions);

  const userId = useAppSelector((state) => state.authentication.user._id);
  const availableReactions = useMemo(() => {
    return reactions.filter((reaction) => {
      const alredyMade = alreadeMadeReactions?.find((react) => react.reaction === reaction);
      if (alredyMade && alredyMade.by.id === userId) return false;
      return true;
    });
  }, [alreadeMadeReactions]);

  return (
    <Reactions>
      {availableReactions.map((reaction) => (
        <ReactionItem key={reaction} onClick={addReaction}>
          {reaction}
        </ReactionItem>
      ))}
    </Reactions>
  );
};

export default ReactionsMenu;
