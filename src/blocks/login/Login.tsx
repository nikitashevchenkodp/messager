import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from 'store/hooks';
import { authenticationActions } from 'store/slices/authentication';
import Input from '../../components/AuthInput/AuthInput';
import { Button, Fieldset, Form, FormContainer, LoginContainer, Title } from './styled';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useAppDispatch();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(authenticationActions.loginStart({ email, password }));
  };

  return (
    <LoginContainer>
      <Title>Login</Title>
      <Form onSubmit={submit}>
        <FormContainer>
          <Fieldset>
            <Input
              label="Email"
              type="text"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              label="Password"
              type="text"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Fieldset>
          <Button type="submit">Submit</Button>
          <p>
            Dont have an account?? <Link to="/signup">Signup</Link>
          </p>
        </FormContainer>
      </Form>
    </LoginContainer>
  );
};

export default Login;
