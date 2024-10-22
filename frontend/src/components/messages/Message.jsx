import { useAuthContext } from "../../context/authContext";
import { useConversationContext } from "../../context/conversationContext";
import { extractTime } from "../../utils/exractTime";

// profile picture
// "https://cdn0.iconfinder.com/data/icons/communication-line-10/24/account_profile_user_contact_person_avatar_placeholder-512.png"

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversationContext();

  const fromMe = message.senderId === authUser._id;
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profilePicture = fromMe
    ? authUser.profilePicture
    : selectedConversation?.profilePicture;
  const bubbleBgColor = fromMe ? "bg-blue-500" : "";
  const formattedTime = extractTime(message.createdAt);
  // shake class
  const messaShake = message.shouldShake ? "shake" : "";

  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img src={profilePicture} alt="Tailwind CSS chat bubble component" />
        </div>
      </div>
      <div
        className={`chat-bubble text-white ${bubbleBgColor} ${messaShake} mb-2 pb-2`}
      >
        {message.message}
      </div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center text-white bg-blue-500">
        {formattedTime}
      </div>
    </div>
  );
};

export default Message;
