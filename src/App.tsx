import React, { useEffect } from 'react';
import { AuthenticationLayout, MainLayout } from 'layouts';

import './App.css';
import { useAppSelector } from 'store/hooks';

declare module 'notistack' {
  interface VariantOverrides {
    reportComplete: true;
  }
}

function App() {
  const user = useAppSelector((state) => state.authentication.user);
  return <>{user ? <MainLayout /> : <AuthenticationLayout />}</>;
}

export default App;
