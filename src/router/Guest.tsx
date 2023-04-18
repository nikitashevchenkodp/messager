import React, { FC } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from 'store/hooks';
import { getIsAuth } from 'store/selectors';

interface AuthenticatedProps {
  children: React.ReactNode;
}
const Guest: FC<AuthenticatedProps> = (props) => {
  const isAuth = useAppSelector(getIsAuth);
  if (isAuth) {
    return <Navigate to="/" />;
  }

  return <>{props.children}</>;
};
export default Guest;
