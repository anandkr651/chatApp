import jwt from "jsonwebtoken";
import { User } from "../model/user.model.js";

export const verifyJWT = async (req, res, next) => {
  try {
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
    //   console.log(token);

    if (typeof token !== "string") {
      return res.status(400).json({ message: "Invalid token format" });
    }
    if (!token) {
      return res.status(400).json({ message: "unauthorized request" });
    }
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decodedToken?._id).select("-password");

    if (!user) {
      return res.status(400).json({ message: "invalid user" });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(400).json({
      message: error?.message || "invalid access token",
      error: true,
      success: false,
    });
  }
};
