import { Router } from "express";
import { sendMessage } from "../controller/message.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { getMessage } from "../controller/message.controller.js";

const router = Router();
router.route("/sender/:id").post(verifyJWT, sendMessage);
router.route("/get/:id").get(verifyJWT, getMessage);

export default router;
