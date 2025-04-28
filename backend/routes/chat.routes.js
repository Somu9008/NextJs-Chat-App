import express from "express";
import { getUserChat, sendMessage } from "../controller/chat.controller.js";

const router = express.Router();

router.route("/getuserchat").post(getUserChat);
router.route("/sendmessage").post(sendMessage);

export default router;
