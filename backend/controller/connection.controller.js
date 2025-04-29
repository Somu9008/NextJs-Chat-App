import Connections from "../models/connectionModel.js";
import User from "../models/userModel.js";

export const sendConnectionRequests = async (req, res) => {
  try {
    const { token, connectionId } = req.body;

    const user = await User.findOne({ token });
    if (!user) return res.status(404).json({ message: "user not found" });

    const connectionUser = await Connections.findOne({
      connectionId: connectionId,
      userId: user._id,
    });

    if (connectionUser) {
      return res.status("you have already connected");
    }

    const newConnection = new Connections({
      userId: user._id,
      connectionId: connectionId,
    });

    await newConnection.save();
    return res.status(200).json({ message: "you have sent a requests" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const whatAreMyConnectionRequestsent = async (req, res) => {
  try {
    const { token } = req.body;

    const user = await User.findOne({ token });
    if (!user) return res.status(404).json({ message: "user not found" });

    const connectionRequests = await Connections.find({
      userId: user._id,
    }).populate("connectionId", "name username email profilePicture");

    return res.status(200).json({ myRequests: connectionRequests });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getMyConnectionRequests = async (req, res) => {
  try {
    const { token } = req.body;

    const user = await User.findOne({ token });

    if (!user) return res.status(404).json({ message: "user not found" });

    const connection = await Connections.find({
      connectionId: user.id,
    }).populate("userId", "name username email profilePicture");

    return res.status(200).json({ userRequests: connection });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const acceptRequest = async (req, res) => {
  try {
    const { token, connectionId, acceptType } = req.body;
    const user = await User.findOne({ token });

    if (!user) return res.status(404).json({ message: "user not found" });

    let connection = await Connections.findOne({
      userId: connectionId,
      connectionId: user._id,
    });

    if (!connection) {
      return res.status(400).json({ message: "connection  not found" });
    }

    if (acceptType === "accept") {
      connection.isContected = true;
    } else {
      connection.isContected = false;
    }

    await connection.save();
    return res.status(200).json({ message: "you accepted the request" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
