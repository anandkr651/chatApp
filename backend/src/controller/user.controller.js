import { User } from "../model/user.model.js";
import bcrypt from "bcrypt";
import generateAccessToken from "../utils/generateAccessToken.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { deleteOnCloudinary } from "../utils/deleteOnCloudinary.js";

const registerUser = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;
    if ([fullname, email, password].some((field) => !field || field.trim() === "")){
      return res.status(400).json({
        message: "Provide email, name, password",
        error: true,
        success: false,
      });
    }
    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(400).json({
        message: "email is allready exist",
        error: true,
        success: false,
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      fullname,
      email,
      password: hashPassword,
    });
    const createUser = await User.findById(user._id).select("-password");
    if (!createUser) {
      return res.status(500).json({
        message: "something went wrong while registering the user",
        error: true,
        success: false,
      });
    }

    return res.status(201).json({
      message: "user registered successfully",
      data: createUser,
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if ([email, password].some((field) => !field || field.trim() === "")) {
      return res.status(400).json({
        message: "Provide email and password",
        error: true,
        success: false,
      });
    }
    const existUser = await User.findOne({ email });
    if (!existUser) {
      return res.status(400).json({
        message: "User not register",
        error: true,
        success: false,
      });
    }
    const checkPassword = await bcrypt.compare(password, existUser.password);
    if (!checkPassword) {
      return res.status(400).json({
        message: "check your password",
        error: true,
        success: false,
      });
    }
    const accessToken = await generateAccessToken(existUser._id);

    const option = {
      httpOnly: true,
      secure: true,
    };
    const updateUser = await User.findByIdAndUpdate(existUser._id, {
      lastLoginDate: new Date().toLocaleString(),
    });

    return res.status(200).cookie("accessToken", accessToken, option).json({
      message: "login successfully",
      data: accessToken,
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

const logout = async (req, res) => {
  try {
    const option = {
      httpOnly: true,
      secure: true,
    };

    return res.status(200).clearCookie("accessToken", option).json({
      message: "user logged out",
      success: true,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

const updateUserAvatar = async (req, res) => {
  try {
    const avatarLocalPath = req.file?.path;
    if (!avatarLocalPath) {
      return res.status(400).json({
        message: "avatar file is missing",
        error: true,
        success: false,
      });
    }
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    if (!avatar.url) {
      return res.status(500).json({
        message: "error while uploading the avatar",
        error: true,
        success: false,
      });
    }
    const currentUser = await User.findById(req.user.id);
    if (currentUser.avatar) {
      const currentAvatar = currentUser.avatar;
      const deleteAvatar = currentAvatar.split("/").pop().split(".")[0];
      if (deleteAvatar) {
        console.log("delete image on cloudinary");
        await deleteOnCloudinary(deleteAvatar);
      }
    }
    const user = await User.findByIdAndUpdate(req.user._id, {
      avatar: avatar.url,
    });

    return res.status(200).json({
      message: "avatar updated successfully",
      error: false,
      success: true,
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
const updateProfile = async (req, res) => {
  try {
    const user = req.user;
    // console.log(user);
    /*{
        _id: new ObjectId('6832b43eedc94092b7a68541'),
        fullname: 'one',
        email: 'one@gmail.com',
        avatar: 'http://res.cloudinary.com/anand-kumar/image/upload/v1748153907/jdhcov7qtcflihowga0c.jpg',
        mobile: '',
        lastLoginDate: '25/5/2025, 12:09:34 pm',
        createdAt: 2025-05-25T06:10:06.899Z,
        updatedAt: 2025-05-25T06:39:34.775Z,
        __v: 0
    } */
    const { fullname, email, mobile } = req.body;

    const updateUser = await User.findByIdAndUpdate(user._id, {
      fullname,
      email,
      mobile,
    });

    return res.status(200).json({
      message: "update data successfully",
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
const allUserExceptOnline = async (req, res) => {
  try {
    const loggedInUser = req.user._id;
    const alluser = await User.find({ _id: { $ne: loggedInUser } }).select("-password");

    return res.status(201).json({
      data: alluser,
      success: true,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
const userDetails = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    return res.json({
      message: "User details",
      data: user,
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export {
  registerUser,
  login,
  logout,
  updateUserAvatar,
  updateProfile,
  allUserExceptOnline,
  userDetails,
};
