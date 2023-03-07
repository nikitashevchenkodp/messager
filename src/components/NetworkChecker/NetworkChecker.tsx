import React, { useEffect } from 'react';
import { useAppDispatch } from 'store/hooks';
import { snackbarActions } from 'store/slices/snackbar';

const NetworkChecker = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleOfline = () =>
      dispatch(
        snackbarActions.enqueueSnackbar({
          message: 'You are offline',
          options: {
            key: new Date().getTime() + Math.random(),
            variant: 'error'
          }
        })
      );
    const handleOnline = () =>
      dispatch(
        snackbarActions.enqueueSnackbar({
          message: 'You are online',
          options: {
            key: new Date().getTime() + Math.random(),
            variant: 'success'
          }
        })
      );
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOfline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOfline);
    };
  }, []);

  return null;
};

export default NetworkChecker;
