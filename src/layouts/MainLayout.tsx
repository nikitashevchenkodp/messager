import { Center, Left } from 'components';
import Right from 'components/right';
import './MainLayout.scss';
const MainLayout = () => {
  return (
    <div className="mainlayout" data-testid="mainlayout">
      <Left />
      <Center />
      <Right />
    </div>
  );
};

export default MainLayout;
