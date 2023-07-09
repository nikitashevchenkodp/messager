import { Center, Left } from 'components';
import Right from 'components/right';
import { SocketProvider } from 'contexts/SocketContexts';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { initialResponse } from 'store/thunks';
import './MainLayout.scss';
const MainLayout = () => {
  const dispatch = useAppDispatch();
  const isGlobalLoading = useAppSelector((state) => state.ui.isGlobalLoading);
  useEffect(() => {
    dispatch(initialResponse());
  }, []);

  return (
    <>
      {isGlobalLoading ? (
        <h1>Loading...</h1>
      ) : (
        <SocketProvider>
          <div className="mainlayout" data-testid="mainlayout">
            <Left />
            <Center />
            <Right />
          </div>
        </SocketProvider>
      )}
    </>
  );
};

export default MainLayout;
