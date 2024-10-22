import React, { createContext, useState, useContext } from "react";
// create context
export const ConversationContext = createContext();

const ConversationContextProvider = ({ children }) => {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);

  return (
    <ConversationContext.Provider
      value={{
        messages,
        setMessages,
        conversations,
        setConversations,
        selectedConversation,
        setSelectedConversation,
      }}
    >
      {children}
    </ConversationContext.Provider>
  );
};

export const useConversationContext = () => {
  return useContext(ConversationContext);
};
export default ConversationContextProvider;
