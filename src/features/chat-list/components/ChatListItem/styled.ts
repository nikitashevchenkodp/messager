import styled from 'styled-components';

export const NotifficationQuantity = styled.p`
  position: absolute;
  right: 10px;
  bottom: 10px;
  padding: 2px 6px;
  font-size: 12px;
  font-weight: 700;
  display: inline-block;
  border-radius: 50%;
  background-color: grey;
  color: #fff;
`;

export const ChatListItemContainer = styled.div<{ isActive: boolean }>`
  display: flex;
  padding: 10px;
  gap: 15px;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  background-color: ${(props) => (props.isActive ? ' rgb(65,159,217)' : '#fff')};
  color: ${(props) => (props.isActive ? '#fff' : 'black')};
  ${NotifficationQuantity} {
    background-color: ${(props) => props.isActive && '#fff'};
    color: ${(props) => (props.isActive ? 'rgb(65,159,217)' : '#fff')};
  }
  div,
  p,
  span {
    color: ${(props) => (props.isActive ? '#fff' : 'black')};
    background-color: ${(props) => props.isActive && ' rgb(65,159,217)'};
  }
`;
export const Avatar = styled.img`
  border-radius: 50%;
  width: 47px;
  min-width: 47px;
  max-width: 47px;
  min-height: 47px;
  max-height: 47px;
  background-color: teal;
`;
export const ChatListItemInfoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Title = styled.p`
  font-weight: 700;
  width: 100%;
  white-space: nowrap;
  font-size: 14px;
`;
export const LastMessage = styled.p`
  max-width: 100%;
  /* white-space: nowrap; */
  font-size: 15px;
  color: rgb(154, 154, 154);
  padding-right: 85px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  /* width: 100px; */
  flex-grow: 1;
`;

export const ExtraInformation = styled.div`
  width: 100%;
  display: flex;

  justify-content: space-between;
`;

export const LastMessageTime = styled.p<{ hide: boolean }>`
  color: grey;
  font-size: 14px;
  position: absolute;
  right: 10px;
  top: 10px;
  background-color: transparent;
  display: ${(props) => (props.hide ? 'none' : 'block')};
`;

export const AvatarContainer = styled.div`
  position: relative;
`;

export const NetworkStatus = styled.div<{ online: boolean }>`
  display: ${(props) => (props.online ? 'block' : 'none')};
  position: absolute;
  bottom: 0;
  right: 0;
  border: 2px solid #fff;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: green;
`;
