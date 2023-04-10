import Login from 'blocks/login/Login';
import Signup from 'blocks/signup/Signup';
import React from 'react';
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
const Container = styled.div`
  position: relative;
  min-height: 100vh;
`;

const AuthenticationLayout = () => {
  return (
    <Container>
      <Outlet />
    </Container>
  );
};

export default AuthenticationLayout;
