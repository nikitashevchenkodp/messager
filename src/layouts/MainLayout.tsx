import { Center, Left } from 'components';
import Right from 'components/right';
import { useEffect } from 'react';
import { useAppDispatch } from 'store/hooks';
import { initialResponse } from 'store/thunks';
import './MainLayout.scss';
const MainLayout = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initialResponse());
  }, []);

  return (
    <div className="mainlayout" data-testid="mainlayout">
      <Left />
      <Center />
      <Right />
    </div>
  );
};

export default MainLayout;
