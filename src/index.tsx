import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { persistor, store } from 'store';
import { PersistGate } from 'redux-persist/integration/react';
import { SnackbarProvider } from 'notistack';
import swDEV from './swDev';
import Button from 'components/shared/Button';
import { snackbarActions } from 'store/slices/snackbar';
import NetworkChecker from 'components/utils-components/NetworkChecker';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NetworkChecker />
        <SnackbarProvider
          // Components={{
          //   reportComplete: MessageNotification
          // }}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          action={(key) => (
            <Button
              style={{ color: '#fff' }}
              onClick={() => store.dispatch(snackbarActions.closeNotification(key))}>
              Close
            </Button>
          )}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </SnackbarProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
// swDEV();
