import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import MainLayout from './layouts/MainLayout';
import { useDispatch } from 'react-redux';
import { uiActions } from './store/slices/UI';
import WindowEvent from './helpers/WindowEventWrapper';

function App() {
  const dispatch = useDispatch();

  const resizeHandler = () => {
    dispatch(uiActions.setWindowWidth());
    if (window.innerWidth <= 756) {
      dispatch(uiActions.hideChatList());
    }
    if (window.innerWidth > 756) {
      dispatch(uiActions.showChatList());
    }
  };

  return (
    <>
      <WindowEvent eventType="resize" handler={resizeHandler} />
      <MainLayout />
    </>
  );
}

export default App;
