import React, { FC } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { FastReactionContainer } from './styled';
interface IFastReaction {
  position: 'left' | 'right';
}

const FastReaction: FC<IFastReaction> = ({ position }) => {
  console.log(position);

  return (
    <FastReactionContainer position={position}>
      <FavoriteIcon color="error" />
    </FastReactionContainer>
  );
};

export default FastReaction;
