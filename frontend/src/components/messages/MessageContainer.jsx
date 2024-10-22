import React, { useEffect } from "react";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import { useState } from "react";
import NoSelectedChat from "./NoSelectedChat";
import { useConversationContext } from "../../context/conversationContext";

const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } =
    useConversationContext();

  useEffect(() => {
    // clean up (unmount)
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]); //setSelectedConversation - used only
  return (
    <div className="md:min-w-[450px] flex flex-col">
      {selectedConversation ? (
        <>
          <div className="bg-slate-500 px-4 py-2 mb-2">
            <span className="label-text">To:</span>{" "}
            <span className="text-gray-900 font-bold">
              {selectedConversation.fullName}
            </span>
          </div>
          <Messages />
          <MessageInput />
        </>
      ) : (
        <NoSelectedChat />
      )}
    </div>
  );
};

export default MessageContainer;
