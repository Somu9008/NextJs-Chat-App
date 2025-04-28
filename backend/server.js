import express, { urlencoded } from "express";
import mongoose from "mongoose";
import User from "./models/userModel.js";
import cors from "cors";
import userRoutes from "./routes/user.routes.js";
import connectionRoutes from "./routes/connetion.routes.js";
import chatRoutes from "./routes/chat.routes.js";
const app = express();
app.use(cors());
app.use(express.json());
app.use(express({ urlencoded: true }));

app.use("/users", userRoutes);
app.use("/connection", connectionRoutes);
app.use("/chat", chatRoutes);

await mongoose.connect("mongodb://localhost:27017/new_project");
console.log("db connected successufully");

app.listen(8080, () => {
  console.log("serever running under 8080");
});
