import Chat from "../models/Chat.model.js";
import User from "../models/userModel.js";

export const getUserChat = async (req, res) => {
  try {
    const { currentUserId, userChatId } = req.body;
    const user = await User.findOne({ _id: userChatId });

    const chatUser = await Chat.findOne({
      $or: [
        { senderId: currentUserId, receiverId: userChatId },
        { senderId: userChatId, receiverId: currentUserId },
      ],
    });

    if (!chatUser) {
      return res.status(200).json({ userChat: [], user }); // No chat yet
    }

    return res.status(200).json({ userChat: chatUser.userChat, user });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { currentUserId, message, friendUserId } = req.body;

    const from = await User.findOne({ _id: currentUserId });
    const to = await User.findOne({ _id: friendUserId });

    const chatUser = await Chat.findOne({
      $or: [
        { senderId: currentUserId, receiverId: friendUserId },
        { senderId: friendUserId, receiverId: currentUserId },
      ],
    });

    const newMessage = {
      from: from.username,
      to: to.username,
      message,
      date: Date.now(),
    };

    if (chatUser) {
      chatUser.userChat.push(newMessage);
      await chatUser.save();
    } else {
      const newChat = new Chat({
        senderId: currentUserId,
        receiverId: friendUserId,
        userChat: [newMessage],
      });

      await newChat.save();
    }

    return res.status(200).json({ message: "message sent" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
