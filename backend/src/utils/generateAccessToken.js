import jwt from "jsonwebtoken";

const generateAccessToken = async (userId) => {
  const token = await jwt.sign(
    { _id: userId },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "10d",
    }
  );
  return token;
};

export default generateAccessToken;
