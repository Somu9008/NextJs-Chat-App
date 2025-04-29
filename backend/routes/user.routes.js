import express from "express";
import {
  getAllUser,
  uploadePrifilePicture,
  userLogin,
  userRegister,
} from "../controller/user.controller.js";

const router = express.Router();

const storage = diskStorage({
  destination: (req, file, cb) => {
    cb(null, "/uploades");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const uploade = multer({ Storage: storage });

router.route("/register").post(userRegister);
router.route("/login").post(userLogin);
router.route("/all_users").post(getAllUser);
router
  .route("/uplode_profilePicture", uploade.single("profilePicture"))
  .post(uploadePrifilePicture);

export default router;
