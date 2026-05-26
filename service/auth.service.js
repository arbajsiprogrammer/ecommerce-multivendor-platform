import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";

dotenv.config();
const secretKey = process.env.JWT_SECRET_KEY;
console.log("secretKey", secretKey);

const generateToken = async (payload) => {
  return await jwt.sign(payload, secretKey, { expiresIn: "1h" });
};

const verifyToken = async (token) => {
  try {
    return await jwt.verify(token, secretKey);
  } catch (error) {
    return null;
  }
};

const hashPassword = async function (password) {
  try {
    const hashed = await bcrypt.hash(password, 10);
    return hashed;
  } catch (error) {
    console.log(error);
  }
};

const verifyPassword = async function (password, hashed_password) {
  try {
    const isMatch = await bcrypt.compare(password, hashed_password);
    return isMatch;
  } catch (error) {
    console.log(error);
  }
};
export { generateToken, verifyToken, hashPassword, verifyPassword };
