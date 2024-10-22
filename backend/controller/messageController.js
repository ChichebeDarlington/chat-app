import { Conversation } from "../models/conversation.js";
import { Message } from "../models/message.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const SendMessage = async (req, res) => {
  const { message } = req.body;
  const { id: receiverId } = req.params;
  const senderId = req.user._id;
  try {
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    // While this will save one after another.
    // await conversation.save();
    // await newMessage.save();

    // this will be saved at same time
    await Promise.all([conversation.save(), newMessage.save()]);

    // socket io
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      // io.to(<socket._id>).emit() =>is used to send event to a specific client
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error exist in the SendMessage:", error.message);
    res.status(500).json({ error: "Internal server error..." });
  }
};

export const GetMessages = async (req, res) => {
  const { id: userToChatId } = req.params;
  const senderId = req.user._id;

  try {
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages");

    if (!conversation) return res.status(200).json([]);

    const messages = conversation.messages;

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error exist in the SendMessage:", error.message);
    res.status(500).json({ error: "Internal server error..." });
  }
};
