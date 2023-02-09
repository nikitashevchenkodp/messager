import React from 'react';
import styled from 'styled-components';
import { ButtonBase } from 'components/shared/styled';

const TabsButton = styled(ButtonBase)<{ isActive: boolean }>`
  width: 100%;
  padding: 8px 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => (props.isActive ? 'rgb(23,33,43)' : 'transparent')};
  transition: 0.1s;
`;

export default TabsButton;
