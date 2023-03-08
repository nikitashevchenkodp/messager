import styled from 'styled-components';

export const SidebarContainer = styled.div`
  background: #fff;
  width: 300px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 30px 0;
`;
export const SidebarHeader = styled.div`
  padding-left: 20px;
  padding-right: 20px;
  margin-bottom: 20px;
`;
export const UserFullname = styled.p`
  font-weight: 600;
  font-size: 15px;
`;

export const Menu = styled.ul`
  padding: 10px 0;
`;
export const MenuItem = styled.li`
  display: flex;
  align-items: center;
  gap: 14px;
  cursor: pointer;
  padding: 8px 20px;
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
`;
export const MenuIcon = styled.div<{ color?: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.color || 'transparent'};
  color: #fff;
  padding: 3px;
  border-radius: 5px;
  font-size: 18px;
`;
export const MenuItemTitle = styled.p`
  font-weight: 600;
`;
