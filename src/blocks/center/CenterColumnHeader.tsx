import { SearchIcon } from 'components/icons';
import { CHAT_LIST_MIN_WIDTH } from 'consts';
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { getChatListState } from 'store/selectors';
import { uiSettingsActions } from 'store/slices/UI';
import { CenterColumnHeaderStyled } from './centerColumnStyled';
import SearchInput from './chat-list/SearchInput/SearchInput';

const CenterColumnHeader = () => {
  const dispatch = useAppDispatch();
  const [val, setVal] = useState('');

  const chatListState = useAppSelector(getChatListState);
  const handleClick = () => {
    dispatch(uiSettingsActions.setChatListWidth(CHAT_LIST_MIN_WIDTH));
  };
  return (
    <CenterColumnHeaderStyled>
      {chatListState === 'expanded' ? (
        <SearchInput value={val} onChange={(e) => setVal(e.target.value)} label="Search" />
      ) : (
        <SearchIcon onClick={handleClick} cursor="pointer" />
      )}
    </CenterColumnHeaderStyled>
  );
};

export default CenterColumnHeader;
