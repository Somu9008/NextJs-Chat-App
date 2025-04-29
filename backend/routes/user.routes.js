import express from "express";
import {
  getAllUser,
  uploadePrifilePicture,
  userLogin,
  userRegister,
} from "../controller/user.controller.js";
import multer, { diskStorage } from "multer";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploades/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const uploade = multer({ storage: storage });

router.route("/register").post(userRegister);
router.route("/login").post(userLogin);
router.route("/all_users").post(getAllUser);
router
  .route("/uplodeprofilePicture")
  .post(uploade.single("profilePicture"), uploadePrifilePicture);

export default router;
