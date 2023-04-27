import Button from 'components/shared/Button';
import styled from 'styled-components';

export const Container = styled.div`
  border-radius: 15px;
  width: 440px;
  background-color: #fff;
`;
export const Header = styled.div`
  display: flex;
  width: 100%;
  gap: 20px;
  align-items: center;
  padding: 15px 15px 5px 15px;
  /* justify-content: space-between; */
`;
export const Body = styled.div`
  padding: 0 10px;
`;
export const Footer = styled.div`
  display: flex;
  align-items: center;
  padding: 5px 15px 10px 15px;
`;
export const Title = styled.h4`
  font-size: 20px;
  font-weight: 500;
`;

export const ImagesList = styled.div`
  display: flex;
  flex-wrap: wrap;
  overflow: auto;
  flex-shrink: 1;
  gap: 0.5rem;
  margin: 10px;
  max-height: 26rem;
`;

export const ImageListItem = styled.div`
  flex: 1 calc(50% - 0.5rem);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  overflow: hidden;

  img {
    object-fit: cover;
    height: 190px;
  }
`;

export const PrimaryButton = styled(Button)`
  background-color: rgb(57, 165, 219);
  color: #fff;
  text-transform: uppercase;
  padding: 8px 16px;
  transition: 0.1s;
  border-radius: 4px;
  font-size: 15px;
`;
