import Avatar from 'components/shared/Avatar';
import styled from 'styled-components';

export const ReactionsContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 3px;
`;

export const ReactionButton = styled.button<{ messageType: 'sent' | 'recieved' }>`
  display: flex;
  align-items: center;
  gap: 6px;
  width: auto;
  border: 2px solid ${(props) => (props.messageType === 'sent' ? '#fff' : 'rgb(200, 255, 227)')};
  border-radius: 1.75rem;
  overflow: visible;
  line-height: 1.75rem;
  font-size: 20px;
  background-color: transparent;
  padding: 0 3px;
  cursor: pointer;
  transition: 0.2s;
  &:hover {
    transition: 0.2s;

    background: linear-gradient(
      90deg,
      rgba(0, 0, 0, 0.1) 100%,
      rgba(255, 255, 255, 0.17833070728291311) 100%
    );
  }
`;

export const ReactionAvatar = styled(Avatar)`
  width: 20px;
  height: 20px;
  font-size: 10px;
  &:not(:first-child) {
    position: relative;
    left: -5px;
  }
`;
