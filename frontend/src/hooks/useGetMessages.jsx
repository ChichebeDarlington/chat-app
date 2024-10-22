import React, { useEffect, useState } from "react";
import { useConversationContext } from "../context/conversationContext";
import axios from "axios";
import { toast } from "react-toastify";

const useGetMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } =
    useConversationContext();

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);

      try {
        const { data } = await axios(
          `/api/message/${selectedConversation._id}`
        );
        if (data.error) {
          throw new Error(data.error);
        }
        setMessages(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    if (selectedConversation?._id) getMessages();
  }, [selectedConversation._id, setMessages]);
  return { messages, loading };
};

export default useGetMessage;
