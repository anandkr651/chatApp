import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import {
  registerUser,
  login,
  logout,
  updateUserAvatar,
  updateProfile,
  allUserExceptOnline,
  userDetails,
} from "../controller/user.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();
router.route("/register").post(registerUser);
router.route("/login").post(login);
router.route("/logout").get(logout);
router
  .route("/updateAvatar")
  .post(verifyJWT, upload.single("avatar"), updateUserAvatar);
router.route("/updateProfile").post(verifyJWT, updateProfile);
router.route("/allUserExceptOnline").get(verifyJWT, allUserExceptOnline);
router.route("/userDetails").get(verifyJWT, userDetails);

export default router;
