import { FC, useEffect, useRef } from 'react';
import './MessageInput.scss';
const MessageInput: FC<React.HTMLAttributes<HTMLDivElement> & { value: string }> = (props) => {
  const node = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (node.current) {
      node.current.innerHTML = props.value;
      const range = document.createRange();
      const sel = window.getSelection();
      if (!node.current.childNodes.length) return;
      range.setStart(node.current.childNodes[0], (node.current.childNodes[0] as any).length);
      range.collapse(true);
      sel!.removeAllRanges();
      sel!.addRange(range);
      node.current.focus();
    }
  }, [props.value]);

  return (
    <div className="message-input-container">
      <div
        role="textbox"
        contentEditable="true"
        className="message-input"
        onInput={props.onInput}
        ref={node}
      />

      {!props.value.length && <span className="message-input-placeholder">Message</span>}
    </div>
  );
};

export default MessageInput;
