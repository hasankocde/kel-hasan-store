import React from 'react';
import ConversationItem from './ConversationItem';

const Conversation = ({ conversations = [] }) => {
  return (
    <div className="p-1">
      {conversations.map((item, index) => (
        <ConversationItem 
          key={index}
          message={item.messages[0].messageText} // İlk mesajı göster
          time={new Date(item.messages[0].timestamp).toLocaleString()} // Mesajın zamanını formatla
          name={item.participants[0].name} // Gönderenin adını göster
          active={index === 0} // İlk konuşmayı aktif olarak belirle
        />
      ))}
    </div>
  );
};

export default Conversation;
