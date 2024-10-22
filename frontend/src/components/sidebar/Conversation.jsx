import React from "react";
import { useConversationContext } from "../../context/conversationContext";
import { useSocketContext } from "../../context/SocketContext";

// Profile picture
// "https://cdn0.iconfinder.com/data/icons/communication-line-10/24/account_profile_user_contact_person_avatar_placeholder-512.png"

const Conversation = ({ text, emoji, lastIndex }) => {
  const { selectedConversation, setSelectedConversation } =
    useConversationContext();
  const isSelected = selectedConversation?._id === text._id;
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(text._id);
  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer ${
          isSelected ? "bg-sky-500" : ""
        }`}
        onClick={() => setSelectedConversation(text)}
      >
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-12 rounded-full">
            <img src={text.profilePicture} alt="user avatar" />
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-gray-200">{text?.fullName}</p>
            <span className="text-xl">{emoji}</span>
          </div>
        </div>
      </div>
      {!lastIndex && <div className="divider my-0 py-0 h-1"></div>}
    </>
  );
};

export default Conversation;
