import { FC } from 'react';
import './MessageInput.scss';
const MessageInput: FC<React.HTMLAttributes<HTMLDivElement> & { value: string }> = (props) => {
  return (
    <div className="message-input-container">
      <div role="textbox" contentEditable="true" className="message-input" {...props} />
      {!props.value.length && <span className="message-input-placeholder">Message</span>}
    </div>
  );
};

export default MessageInput;
