import React from 'react';
import { AuthenticationLayout, MainLayout } from 'layouts';

import './App.css';
import { useAppSelector } from 'store/hooks';
import SocketContextComponent from 'contexts/SocketContextComponent';

function App() {
  const user = useAppSelector((state) => state.authentication.user);

  return <>{user ? <MainLayout /> : <AuthenticationLayout />}</>;
}

export default App;
