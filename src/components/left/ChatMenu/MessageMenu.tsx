import React from 'react';

const ChatMenu = () => {
  return (
    <div className="menu">
      <div className="menu-item">
        <span className="material-symbols-outlined">edit</span>
        Mute
      </div>
      <div className="menu-item">
        <span className="material-symbols-outlined">push_pin</span>
        Forward
      </div>
      <div className="menu-item color-error">
        <span className="material-symbols-outlined">delete</span>
        Delete
      </div>
    </div>
  );
};

export default ChatMenu;
