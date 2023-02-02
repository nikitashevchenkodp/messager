import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import MainLayout from './layouts/MainLayout';
import { useDispatch } from 'react-redux';
import { uiActions } from './store/slices/UI';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const resizeHandler = () => {
      dispatch(uiActions.setWindowWidth());
      if (window.innerWidth < 756) {
        dispatch(uiActions.hideChatList());
      }
      if (window.innerWidth > 756) {
        dispatch(uiActions.showChatList());
      }
    };
    window.addEventListener('resize', resizeHandler);
  });
  console.log('App');

  return <MainLayout />;
}

export default App;
