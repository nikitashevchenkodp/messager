import React, { useEffect } from 'react';
import { AuthenticationLayout, MainLayout } from 'layouts';
import { useRoutes } from 'react-router-dom';
import './App.css';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { routes } from 'router/routes';
import { authenticationActions } from 'store/slices/authentication';

declare module 'notistack' {
  interface VariantOverrides {
    reportComplete: true;
  }
}

function App() {
  const dispatch = useAppDispatch();
  const router = useRoutes(routes);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      dispatch(authenticationActions.setIsAuth(true));
    } else {
      dispatch(authenticationActions.setIsAuth(false));
    }
  }, []);

  return <>{router}</>;
}

export default App;
