import styled from 'styled-components';

export const GridContainer = styled.div`
  /* max-height: 26rem;
  min-height: 5rem; */
  overflow: auto;
  flex-shrink: 1;
  display: flex;
  flex-wrap: wrap;
  gap: 0.15rem;
`;

export const MessageMedia = styled.div`
  flex: 1 calc(50% - 0.15rem);
  min-width: 0;
  position: relative;
  display: flex;
  align-items: center;
  overflow: hidden;
  cursor: pointer;
`;

export const MessageImage = styled.img`
  height: 100%;
  width: 100%;
`;
