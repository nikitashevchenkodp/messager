import styled from 'styled-components';

export const MenuItems = styled.ul`
  border-radius: 8px;
  background-color: #fff;
  padding: 6px 0;
  overflow: hidden;
  width: 150px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
`;

export const MenuItem = styled.li`
  padding: 5px 10px;
  background: #fff;
  width: 100%;
  cursor: pointer;
  transition: 0.1s;
  display: flex;
  align-items: center;
  gap: 4px;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;
