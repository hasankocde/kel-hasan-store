import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import useKellerCall from "../../hooks/useKellerCall";

const Messages = ({ conversations = [] }) => {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const [messageToSend, setMessageToSend] = useState("");
  const [conversationsData, setConversationsData] = useState(conversations);
  const { postKellerData, getMessageData } = useKellerCall();

  useEffect(() => {
    setConversationsData(conversations);
  }, [conversations]);

  const sendMessage = async (adId) => {
    const messageData = {
      adId: adId, // Ensure adId is included in the message body
      message: messageToSend, // Ensure message field is used instead of messageText
    };

    try {
      await postKellerData('messages', messageData); // Post request to 'messages' endpoint
      setMessageToSend(""); // Clear the input after sending
      // Refresh messages after sending
      const data = await getMessageData();
      if (data) {
        setConversationsData(data);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow overflow-y-auto p-3">
        {conversationsData.map((conversation) => (
          <div key={conversation._id} className="mb-4">
            {conversation.messages.map((msg, idx) => {
              if (!msg || !msg.senderId) {
                return null;
              }
              const sender = msg.senderId;
              return (
                <div
                  key={idx}
                  className={`p-2 rounded-md ${sender._id === currentUser._id ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-900'}`}
                >
                  <div className="text-sm">
                    <span className="font-bold">{sender.firstName}</span>: {msg.messageText}
                  </div>
                  <div className="text-xs text-gray-600">{new Date(msg.timestamp).toLocaleString()}</div>
                </div>
              );
            })}
            <div className="flex items-center">
              <input
                className="input text-gray-700 dark:text-gray-200 text-sm p-5 focus:outline-none bg-gray-100 dark:bg-gray-800 flex-grow rounded-l-md"
                type="text"
                placeholder="Type your message ..."
                value={messageToSend}
                onChange={(e) => setMessageToSend(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' ? sendMessage(conversation.adId) : null}
              />
              <button onClick={() => sendMessage(conversation.adId)}>Send</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Messages;
