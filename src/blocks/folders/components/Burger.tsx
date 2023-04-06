import styled from 'styled-components';

const Burger = styled.span`
  display: flex;
  width: 20px;
  height: 1.5px;
  background-color: rgb(141, 137, 163);
  position: relative;
  &::before,
  &::after {
    position: absolute;
    content: '';
    width: 100%;
    height: 100%;
    background-color: inherit;
    transition: 0.2s;
  }

  &::before {
    left: 0;
    top: -6px;
  }
  &::after {
    top: 6px;
    left: 0;
  }
`;

export default Burger;
