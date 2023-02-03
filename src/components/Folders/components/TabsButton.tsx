import React from 'react';
import styled from 'styled-components';
import { ButtonBase } from '../../shared/styled';

const TabsButton = styled(ButtonBase)`
  width: 100%;
  padding: 8px 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
  justify-content: center;
  align-items: center;
  &:active {
    background-color: #fff;
  }
`;

// const TabsButton = () => {
//   return <div>TabsButton</div>;
// };

export default TabsButton;
