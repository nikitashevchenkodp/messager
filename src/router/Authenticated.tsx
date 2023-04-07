import Login from 'blocks/login/Login';
import React, { FC, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from 'store/hooks';

interface AuthenticatedProps {
  children: React.ReactNode;
}
const Authenticated: FC<AuthenticatedProps> = (props) => {
  const user = useAppSelector((state) => state.authentication.user);
  const location = useLocation();
  const [requestedLocation, setRequestedLocation] = useState<string | null>(null);

  if (!user) {
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
