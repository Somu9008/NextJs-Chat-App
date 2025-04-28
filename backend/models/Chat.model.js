import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
  },
  message: {
    type: String,
    required: true,
  },
  isSeen: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const chatSchema = new mongoose.Schema({
  senderId: mongoose.Schema.Types.ObjectId,
  receiverId: mongoose.Schema.Types.ObjectId,
  userChat: [messageSchema],
});

const Chat = mongoose.model("Chat", chatSchema);

export default Chat;
