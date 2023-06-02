import Burger from 'components/ui/Burger';
import Button from 'components/ui/Button';
import SearchInput from 'components/ui/SearchInput';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { LeftContent } from 'store/interfaces';
import { uiActions } from 'store/slices';

const LeftHeader = () => {
  const [val, setVal] = useState('');
  const dispatch = useAppDispatch();
  const leftContent = useAppSelector((state) => state.ui.leftContent);

  const toggleLeftContent = () => {
    if (leftContent === 'chat-list') dispatch(uiActions.setLeftContent(LeftContent.UsersList));
    else dispatch(uiActions.setLeftContent(LeftContent.ChatList));
  };

  return (
    <div className="left-header">
      <Button round width="3.5rem" height="3.5rem" onClick={toggleLeftContent}>
        <Burger />
      </Button>
      <SearchInput
        label="Search..."
        value={val}
        onChange={(e) => setVal(e.target.value)}
        onClick={() => dispatch(uiActions.setLeftContent(LeftContent.Search))}
      />
    </div>
  );
};

export default LeftHeader;
