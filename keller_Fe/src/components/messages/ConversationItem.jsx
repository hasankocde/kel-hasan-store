import React from 'react';

const ConversationItem = ({ name, time, message, active }) => {
  return (
    <div className={`p-3 border-b ${active ? 'bg-gray-300' : ''}`}>
      <div className="flex items-center">
        <div className="w-10 h-10 rounded-full bg-gray-400"></div>
        <div className="ml-3">
          <div className="text-sm font-semibold">{name}</div>
          <div className="text-xs text-gray-600">{message}</div>
          <div className="text-xs text-gray-400">{time}</div>
        </div>
      </div>
    </div>
  );
};

export default ConversationItem;
