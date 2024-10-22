import Conversation from "./Conversation";

import { getRandomEmojis } from "../../utils/emojis";
import useGetConversations from "../../hooks/useGetConversation";

const Conversations = () => {
  // const { filteredUsers } = conversations;
  const { loading, conversations } = useGetConversations();
  return (
    <div className="py-2 flex flex-col overflow-auto">
      {conversations?.filteredUsers?.map((convo, index) => {
        return (
          <Conversation
            key={convo._id}
            text={convo}
            emoji={getRandomEmojis()}
            lastIndex={index === conversations.length - 1}
          />
        );
      })}
      {loading ? <span className="loading loading-spinner"></span> : null}
    </div>
  );
};

export default Conversations;
