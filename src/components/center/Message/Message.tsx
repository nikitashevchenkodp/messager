import classNames from 'classnames';
import React, { FC } from 'react';
import './Message.scss';
import { ReactComponent as OwnTail } from '../../../assets/message/ownTail.svg';
import { ReactComponent as SentTail } from '../../../assets/message/sentTail.svg';
import Avatar from 'components/ui/Avatar';

interface IMessageProps {
  isSelectionModeOn: boolean;
  isSelected?: boolean;
  isOwn: boolean;
  isFirstInGroup?: boolean;
  isLastInGroup?: boolean;
  hasAvatar?: boolean;
  chatType?: 'privat' | 'group' | 'channel';
  setSelected: any;
  setIsSelected: any;
}
const Message: FC<IMessageProps> = (props) => {
  const {
    isOwn,
    isSelected,
    isFirstInGroup,
    isLastInGroup,
    chatType,
    setSelected,
    isSelectionModeOn,
    setIsSelected
  } = props;

  const hasTail = isLastInGroup || (isFirstInGroup && isLastInGroup);

  const msgClasses = classNames({
    msg: true,
    'msg-selected': isSelected,
    'msg-selectionmode-on': isSelectionModeOn,
    hastail: hasTail,
    'msg-own': isOwn,
    'msg-recieved': !isOwn,
    'msg-group-chat': chatType === 'group'
  });

  const withAvatar =
    !isOwn && chatType === 'group' && (isLastInGroup || (isFirstInGroup && isLastInGroup));

  return (
    <div className={msgClasses} onClick={setIsSelected}>
      {isSelectionModeOn && (
        <div className={`msg-selection`}>
          <span className={`material-icons ${isSelected ? 'show' : ''}`}>check_circle</span>
        </div>
      )}
      {withAvatar && (
        <div>
          <Avatar
            src=""
            title="Dmitiy Huk"
            styles={{ width: '5rem', height: '5rem', position: 'absolute', bottom: 0 }}
          />
        </div>
      )}
      <div className="msg-container">
        <div className="msg-content">
          <div className="msg-text">
            .asdfas as dfasd fasd fa asdfasdfasdfasdfa asdfasdf asdf asdfas dfasdfasdfasdf
            asdfasdfasdfa adsfasdfasdfsd sasdasd asdasdasdasdas asdasdasasd asdadasd asda asd
            adsfasdfasdfsdasd adfasdf sadfasdfasfasdf asdfasdasdf
            <span className="msg-meta">
              <span>12:13</span>
              <span className="material-symbols-outlined done_all color-green">done_all</span>
            </span>
          </div>
        </div>
        <div className={`msg-tail ${hasTail ? '' : 'hide'}`}>
          {isOwn ? <OwnTail /> : <SentTail />}
        </div>
      </div>
    </div>
  );
};

export default Message;
