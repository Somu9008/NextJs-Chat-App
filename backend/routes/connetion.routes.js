import express from "express";
import {
  acceptRequest,
  getMyConnectionRequests,
  sendConnectionRequests,
  whatAreMyConnectionRequestsent,
} from "../controller/connection.controller.js";

const router = express.Router();

router.route("/sendconnectionrequest").post(sendConnectionRequests);
router.route("/whataremyrequestsent").post(whatAreMyConnectionRequestsent);
router.route("/getmyconnectionrequest").post(getMyConnectionRequests);
router.route("/acceptrequest").post(acceptRequest);

export default router;
