import React, { useState } from "react";
import { useConversationContext } from "../context/conversationContext";
import axios from "axios";
import { toast } from "react-toastify";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } =
    useConversationContext();

  const sendMessage = async (message) => {
    setLoading(true);

    try {
      const { data } = await axios.post(
        `/api/message/send/${selectedConversation._id}`,
        { message }
      );
      if (data.error) {
        throw new Error(data.error);
      }
      setMessages([...messages, data]);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { sendMessage, loading };
};

export default useSendMessage;
