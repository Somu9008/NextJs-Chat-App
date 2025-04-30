import User from "../models/userModel.js";
import Connections from "../models/connectionModel.js";

export const userRegister = async (req, res) => {
  try {
    const { username, email, name, password } = req.body;
    if (!username || !email || !name || !password) {
      return res.status(400).json({ message: "please fill all inputs" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(402).json({ message: "user already exist" });
    }

    const hasedPassword = password;
    const newUser = new User({
      name,
      username,
      email,
      password: hasedPassword,
    });
    await newUser.save();
    res.status(200).json({ message: "user registerd successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "user not found" });
    }

    if (password != user.password) {
      return res.status(404).json({ message: "invalid userCredentials" });
    }

    const token = Math.floor(Math.random() * 1000000000);
    user.token = token;
    await user.save();
    return res
      .status(200)
      .json({ message: "loggedIn successfully", token, user });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getAllUser = async (req, res) => {
  try {
    const { currentUserId } = req.body; // or wherever you have the logged-in user id

    // Find all connections where the current user is involved
    const userConnections = await Connections.find({
      $or: [{ userId: currentUserId }, { connectionId: currentUserId }],
    });

    // Collect IDs of connected users
    const connectedUserIds = new Set([
      ...userConnections.map((conn) => conn.userId.toString()),
      ...userConnections.map((conn) => conn.connectionId.toString()),
    ]);

    // Always add yourself too (you shouldn't see yourself in the list)
    connectedUserIds.add(currentUserId.toString());

    // Now find users who are NOT in the connected list
    const notConnectedUsers = await User.find({
      _id: { $nin: Array.from(connectedUserIds) },
    });

    console.log(notConnectedUsers);

    return res.status(200).json({ users: notConnectedUsers });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getUserConnect = async (req, res) => {
  try {
    const { token } = req.query;

    const user = await User.findOne({ token });

    const users = await Connections.find({ userId: user._id }).populate(
      "connectionId",
      "name email username"
    );

    console.log(users);
    return res.status(200).json({ connectedUsers: users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const uploadePrifilePicture = async (req, res) => {
  try {
    const { token } = req.body;

    let user = await User.findOne({ token });

    if (!user) return res.status(400).json({ message: "user not found" });

    await User.findByIdAndUpdate(
      {
        _id: user._id,
      },
      { profilePicture: req.file.filename }
    );

    await user.save();
    return res
      .status(200)
      .json({ message: "image uploaded", image: req.file.filename });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const getUserConnectedChat = async (req, res) => {
  try {
    const { connectionId, token } = req.query;

    const user = await User.findOne({ token });

    const connectedUserChat = await Connections.findOne({
      connectionId,
      userId: user._id,
    });
    if (!connectedUserChat) {
      return res.status(400).json({ message: "connection chat is not found" });
    }
    return res.status(200).json({ connectedUserChat: connectedUserChat });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
