import React from 'react';
import Conversation from './Conversation';
import Messages from './Messages';

const MessageContainer = () => {
  return (
    <div className="border w-full m-10 bg-light-grey pb-7 rounded-lg">
      <div className="flex justify-between items-center pt-3 pb-3">
        <h1 className="text-3xl ps-5 pt-5">Nachricht</h1>
      </div>
      <div className="flex">
        <div className="w-1/4 bg-gray-100 dark:bg-gray-800">
          <Conversation />
        </div>
        <div className="w-3/4 bg-gray-100 dark:bg-gray-900">
          <Messages />
        </div>
      </div>
    </div>
  );
};

export default MessageContainer;
