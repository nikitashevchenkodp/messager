import styled from 'styled-components';

interface ChatListContainerProps {
  readonly isHideChatList: boolean;
  readonly withTransition?: boolean;
  readonly defaultWidth?: number;
}

export const ChatListContainer = styled.div<ChatListContainerProps>`
  overflow-x: hidden;
  background-color: #fff;
  border-right: 1px solid grey;
  position: relative;
  height: 100vh;

  max-width: ${(props: ChatListContainerProps) => (props.isHideChatList ? '0' : '100vw')};
  transition: ${(props) => props.withTransition && '0.2s'};

  @media screen and (max-width: 756px) {
    flex-grow: 1;
  }
`;

export const ChatListStyled = styled.div<ChatListContainerProps>`
  width: ${(props) => (props.defaultWidth ? `${props.defaultWidth}px` : '350px')};
  height: 100%;
  max-width: 100%;
  position: relative;
  padding-top: 60px;
  @media screen and (max-width: 756px) {
    width: 100% !important;
  }
`;

export const ChatListHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  border-bottom: 1px solid grey;
  padding: 0px 15px;
  position: absolute;
  top: 0;
  left: 0;
`;

// export const SearchInput = styled.div<ChatListContainerProps>`
//   width: 350px;
//   height: 100%;
// `;

export const List = styled.div`
  max-height: 100%;

  overflow-y: scroll;
`;
// export const ListItem = styled.div<ChatListContainerProps>`
//   width: 350px;
//   height: 100%;
// `;
