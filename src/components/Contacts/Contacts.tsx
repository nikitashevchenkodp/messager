import Button from 'components/shared/Button';
import React, { memo, useEffect, useState } from 'react';
import styled from 'styled-components';
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import SearchInput from 'components/shared/Input/Input';
import SearchIcon from '@mui/icons-material/Search';
import Divider from 'components/shared/Divider';
import { getAllUsers } from 'services/apiService';
import { Avatar } from 'components/shared/Avatar';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { activeEntitiesActions } from 'store/slices/activeEntities';
import { uiSettingsActions } from 'store/slices/UI';

const ContactsContainer = styled.div`
  width: 400px;
  height: 600px;
  border-radius: 20px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
`;
const ContactsHeader = styled.div`
  padding: 20px 20px 5px;
`;
const Filter = styled.div``;
const ContactsTitle = styled.h4`
  font-size: 18px;
`;
const ContactsBody = styled.div`
  height: 100%;
  max-height: 100%;
  overflow-y: scroll;
`;
const ContactsFooter = styled.div`
  padding: 10px 20px;
  margin-top: auto;
  display: flex;
  justify-content: space-between;
`;

const ContactsButton = styled(Button)`
  color: rgb(22, 138, 205);
  padding: 8px 16px;
  transition: 0.1s;
  border-radius: 4px;
  font-size: 15px;
  &:hover {
    background-color: rgba(22, 138, 205, 0.1);
  }
`;

const List = styled.ul`
  padding: 4px 0;
`;
const UserListItem = styled.li`
  display: flex;
  gap: 10px;
  align-items: center;
  padding: 6px 20px;
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0.08);
  }
`;
const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;
const UserName = styled.p``;
const UserMeta = styled.p`
  color: rgb(154, 154, 154);
  font-size: 15px;
`;

interface IContactItem {
  id: string;
  fullName: string;
  avatar: string;
  chatId: string;
}

const Contacts = ({ onClose }: any) => {
  const [serachQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState<IContactItem[]>([]);
  const dispatch = useAppDispatch();
  const online = useAppSelector((state) => state.users.statusesById);

  let initialized = false;

  useEffect(() => {
    if (!initialized) {
      initialized = true;
      getAllUsers()
        .then((res) => setUsers(res.data))
        .catch((e) => console.log(e));
    }
  }, []);

  return (
    <ContactsContainer>
      <ContactsHeader>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '4px'
          }}>
          <ContactsTitle>Contacts</ContactsTitle>
          <Filter>
            <SortByAlphaIcon />
          </Filter>
        </div>
        <div
          style={{
            display: 'flex',
            gap: '5px',
            alignItems: 'center'
          }}>
          <div style={{ color: 'rgba(0,0,0, 0.4)', display: 'flex', alignItems: 'center' }}>
            <SearchIcon />
          </div>
          <SearchInput
            label="Search"
            value={serachQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </ContactsHeader>
      <Divider />
      <ContactsBody>
        <List>
          {users.map((item) => {
            return (
              <UserListItem
                key={item.id}
                onClick={() => {
                  dispatch(
                    activeEntitiesActions.setActiveChat({
                      chatId: item.chatId,
                      user: { id: item.id, fullName: item.fullName, avatar: item.avatar }
                    })
                  );
                  dispatch(uiSettingsActions.setChatState(true));
                  onClose();
                }}>
                <Avatar src={item.avatar} fullName={item.fullName} />
                <UserInfo>
                  <UserName>{item.fullName}</UserName>
                  <UserMeta>
                    {online[item.id] ? (
                      <span style={{ color: 'blue' }}>online</span>
                    ) : (
                      'last seen 4 hours ago'
                    )}
                  </UserMeta>
                </UserInfo>
              </UserListItem>
            );
          })}
        </List>
      </ContactsBody>
      <Divider />
      <ContactsFooter>
        <ContactsButton>Add Contact</ContactsButton>
        <ContactsButton>Close</ContactsButton>
      </ContactsFooter>
    </ContactsContainer>
  );
};

export default memo(Contacts);
