import React from 'react';
import styled, { keyframes } from 'styled-components';
import EditIcon from '@mui/icons-material/Edit';

const apperance = keyframes`
    0%{
        opacity: 1;
    }
    25%{
        opacity: 0.5;

    }
    50%{
        opacity: 0.2;

    }
    75%{
        opacity: 0.5;

    }
    100%{
        opacity: 1;

    }
`;
const move = keyframes`
    from{
      left: calc(100% + 13px);;
    }
    to{
        left: calc(100% + 17px);
    }
`;

const MoveAnimation = styled.div`
  font-size: 13px;
  display: inline-block;
  width: 5px;
  height: 5px;
  position: absolute;
  left: calc(100% + 13px);
  top: 3px;
  animation: ${move};
  animation-duration: 0.8s;
  animation-iteration-count: infinite;
`;

const Dot = styled.span`
  display: inline-block;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: grey !important;
  position: relative;
  &::before,
  &::after {
    content: '';
    width: 100%;
    height: 100%;
    background-color: inherit;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    border-radius: 50%;
  }
  &::before {
    left: 6px;
    animation-name: ${apperance};
    animation-duration: 0.8s;
    animation-iteration-count: infinite;
    animation-delay: 0.4s;
  }
  &::after {
    left: 12px;
    animation-name: ${apperance};
    animation-duration: 0.8s;
    animation-iteration-count: infinite;
    animation-delay: 0.8s;
  }
`;

const TypingIndicator = () => {
  return (
    <div style={{ fontSize: '14px', position: 'relative', display: 'inline-block' }}>
      typing <Dot />{' '}
      <MoveAnimation>
        <EditIcon fontSize="inherit" />
      </MoveAnimation>
    </div>
  );
};

export default TypingIndicator;
