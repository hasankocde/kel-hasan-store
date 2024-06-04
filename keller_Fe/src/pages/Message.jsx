import React, { useEffect, useState } from "react";
import ProfileSidebar from "../components/ProfileSidebar";
import Banner from "../components/Banner";
import Chat from "../components/messages/Chat";
import { useSelector } from "react-redux";
import useKellerCall from "../hooks/useKellerCall";

const Message = () => {
  const { getMessageData } = useKellerCall();
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    getMessageData().then((data) => {
      if (data) {
        setConversations(data); // Assuming data is an array of messages
      }
    });
  }, []);

  const title = `NACHRICHT`;

  return (
    <>
      <div>
        <Banner title={title} target={"/allad"} />
      </div>
      <div className="flex">
        <div>
          <ProfileSidebar />
        </div>
        <div className="flex-grow">
          <Chat conversations={conversations} />
        </div>
      </div>
    </>
  );
};

export default Message;
