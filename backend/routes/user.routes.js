import express from "express";
import {
  getAllUser,
  userLogin,
  userRegister,
} from "../controller/user.controller.js";

const router = express.Router();

router.route("/register").post(userRegister);
router.route("/login").post(userLogin);
router.route("/all_users").post(getAllUser);

export default router;
