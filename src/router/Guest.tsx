import Login from 'blocks/login/Login';
import React, { FC, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from 'store/hooks';

interface AuthenticatedProps {
  children: React.ReactNode;
}
const Guest: FC<AuthenticatedProps> = (props) => {
  const isAuth = useAppSelector((state) => state.authentication.isAuth);
  if (isAuth) {
    return <Navigate to="/" />;
  }

  return <>{props.children}</>;
};
export default Guest;
