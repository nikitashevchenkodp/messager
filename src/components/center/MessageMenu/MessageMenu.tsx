import React from 'react';

const MessageMenu = () => {
  return (
    <div className="menu">
      <div className="menu-item">
        <span className="material-symbols-outlined">edit</span>
        Edit
      </div>
      <div className="menu-item">
        <span className="material-symbols-outlined">check_circle</span>
        Select
      </div>
      <div className="menu-item">
        <span className="material-symbols-outlined">content_copy</span>
        Copy
      </div>
      <div className="menu-item">
        <span className="material-symbols-outlined">reply</span>
        Reply
      </div>
      <div className="menu-item">
        <span className="material-symbols-outlined">arrow_top_right</span>
        Forward
      </div>
      <div className="menu-item color-error">
        <span className="material-symbols-outlined">delete</span>
        Delete
      </div>
    </div>
  );
};

export default MessageMenu;
