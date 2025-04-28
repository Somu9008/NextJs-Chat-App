import mongoose from "mongoose";

const connectionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  connectionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  isContected: {
    type: Boolean,
    default: false,
  },
});

const Connections = await mongoose.model("Connection", connectionSchema);

export default Connections;
