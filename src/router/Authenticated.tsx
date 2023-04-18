import Login from 'blocks/login/Login';
import React, { FC, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from 'store/hooks';
import { getIsAuth } from 'store/selectors';

interface AuthenticatedProps {
  children: React.ReactNode;
}
const Authenticated: FC<AuthenticatedProps> = (props) => {
  const isAuth = useAppSelector(getIsAuth);
  const location = useLocation();
  const [requestedLocation, setRequestedLocation] = useState<string | null>(null);

  if (!isAuth) {
    if (location.pathname !== requestedLocation) {
      setRequestedLocation(location.pathname);
    }
    return <Login />;
  }

  if (requestedLocation && location.pathname !== requestedLocation) {
    setRequestedLocation(null);
    return <Navigate to={requestedLocation} />;
  }

  return <>{props.children}</>;
};

export default Authenticated;
