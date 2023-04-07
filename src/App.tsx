import React, { useEffect } from 'react';
import { AuthenticationLayout, MainLayout } from 'layouts';
import { useRoutes } from 'react-router-dom';
import './App.css';
import { useAppSelector } from 'store/hooks';
import { routes } from 'router/routes';

declare module 'notistack' {
  interface VariantOverrides {
    reportComplete: true;
  }
}

function App() {
  const router = useRoutes(routes);

  return <>{router}</>;
}

export default App;
