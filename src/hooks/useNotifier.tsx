import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { useAppSelector } from 'store/hooks';
import { snackbarActions } from 'store/slices/snackbar';

const useNotifier = () => {
  const dispatch = useDispatch();
  const notifications = useAppSelector((store) => store.snackbar.notifications || []);
  const [displayed, setDisplayed] = useState([] as string[]);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  React.useEffect(() => {
    console.log(notifications.length);
    notifications.forEach(({ message, options, dismissed }) => {
      if (dismissed) {
        // dismiss snackbar using notistack
        closeSnackbar(options.key);
        return;
      }

      // do nothing if snackbar is already displayed
      if (displayed.includes(options.key as string)) return;

      // display snackbar using notistack
      console.log(options);

      enqueueSnackbar(message, {
        ...options,
        onClose: (event, reason, myKey) => {
          if (options.onClose) {
            options.onClose(event, reason, myKey);
          }
        },
        onExited: (event, myKey) => {
          // remove this snackbar from redux store
          dispatch(snackbarActions.removeNotification(myKey));
          setDisplayed((disp) => disp.filter((item) => item !== myKey));
        }
      });

      // keep track of snackbars that we've displayed
      setDisplayed((disp) => disp.concat(options.key as string));
    });
  }, [notifications, closeSnackbar, enqueueSnackbar, dispatch]);
};

export default useNotifier;
