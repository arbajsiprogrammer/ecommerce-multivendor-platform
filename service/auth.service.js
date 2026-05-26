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
    console.log("secretKey", secretKey);
    const user = await jwt.verify(token, secretKey);
    console.log(user, "*********user inside verify token ");
    return user;
  } catch (error) {
    console.log(error);
  }
};

const hashPassword = async function (password) {
  try {
    const hashed = await bcrypt.hash(password, 10);
    console.log(hashed, "inside hash password service");
    return hashed;
  } catch (error) {
    console.log(error);
  }
};

const verifyPassword = async function (password, hashed_password) {
  try {
    const isMatch = await bcrypt.compare(password, hashed_password);
    console.log(isMatch, "inside verify password service");
    return isMatch;
  } catch (error) {
    console.error(error);
  }
};
export { generateToken, verifyToken, hashPassword, verifyPassword };
