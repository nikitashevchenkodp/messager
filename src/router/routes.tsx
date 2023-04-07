import { RouteObject } from 'react-router-dom';
import * as paths from './paths';
import React from 'react';
import MainLayout from 'layouts/MainLayout';
import AuthenticationLayout from 'layouts/AuthenticationLayout';
import Login from 'blocks/login/Login';
import Signup from 'blocks/signup/Signup';
import Authenticated from './Authenticated';
import Guest from './Guest';

export const routes: RouteObject[] = [
  {
    path: paths.MAIN,
    element: (
      <Authenticated>
        <MainLayout />
      </Authenticated>
    )
  },
  {
    path: '',
    element: (
      <Guest>
        <AuthenticationLayout />
      </Guest>
    ),
    children: [
      { path: paths.LOGIN, element: <Login /> },
      { path: paths.SIGNUP, element: <Signup /> }
    ]
  }
];
