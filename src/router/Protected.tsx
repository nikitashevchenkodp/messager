import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from 'store/hooks';

const Protected = (props: any) => {
  const isAuth = useAppSelector((state) => state.user.isAuth);
  if (!isAuth) return <Navigate to="/auth" />;
  return props.children;
};

export default Protected;
