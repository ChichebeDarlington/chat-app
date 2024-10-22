import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useConversationContext } from "../context/conversationContext";

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const { setConversations, conversations } = useConversationContext();

  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        const { data } = await axios("/api/users/users");

        if (data.error) {
          throw new Error(data.error);
        }
        setConversations(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    getConversations();
  }, []);

  return { loading, conversations };
};

export default useGetConversations;
