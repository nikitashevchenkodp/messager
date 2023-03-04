import React from 'react';
import { AuthenticationLayout, MainLayout } from 'layouts';

import './App.css';
import { useAppSelector } from 'store/hooks';

function App() {
  const user = useAppSelector((state) => state.authentication.user);

  return <>{user ? <MainLayout /> : <AuthenticationLayout />}</>;
}

export default App;
