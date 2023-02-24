import React, { useContext } from 'react';
import { AuthenticationLayout, MainLayout } from 'layouts';

import './App.css';
import { useAppSelector } from 'store/hooks';
import SocketContext from 'contexts/SocketContext';

function App() {
  const user = useAppSelector((state) => state.authentication.user);

  return <>{user ? <MainLayout /> : <AuthenticationLayout />}</>;
}

export default App;
