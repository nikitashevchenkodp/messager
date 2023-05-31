import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from 'store/hooks';

const Public = (props: any) => {
  const isAuth = useAppSelector((state) => state.user.isAuth);
  if (isAuth) return <Navigate to="/" />;
  return props.children;
};

export default Public;
