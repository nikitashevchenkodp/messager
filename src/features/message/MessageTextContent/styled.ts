import styled from 'styled-components';

export const MessageText = styled.div`
  font-size: 14px;
  padding: 8px 12px 0px 12px;
  line-height: 1.2;
  font-weight: 500;
  position: relative;
`;

export const MessageMeta = styled.div`
  position: relative;
  top: 2px;
  font-size: 12px;
  float: right;
  line-height: 1.35;
  margin-left: 0.4375rem;
  margin-right: -0.5rem;
  user-select: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 2px;
  color: rgb(160, 172, 182);
`;
