import styled from 'styled-components';
import { ButtonBase } from './shared/styled';

export const LoginContainer = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translateX(-50%);
  width: 300px;
`;

export const Fieldset = styled.fieldset`
  border: none;
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 12px;
  margin-bottom: 20px;
`;

export const FormContainer = styled.div`
  text-align: center;
  width: 100%;
`;

export const Title = styled.h4`
  font-size: 30px;
  margin-bottom: 15px;
`;

export const Form = styled.form`
  width: 100%;
`;

export const Input = styled.input``;

export const Button = styled(ButtonBase)`
  padding: 10px 20px;
  background-color: rgb(57, 165, 219);
  border-radius: 6px;
  font-size: 18px;
  color: white;
  &:disabled {
    background-color: lightblue;
  }
`;
