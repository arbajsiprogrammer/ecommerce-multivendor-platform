import { verifyToken } from "../service/auth.service.js";

const verifyAuthToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res
        .status(400)
        .json({ message: "invalid credentials...token not found" });
    }
    const user = await verifyToken(token);

    if (!user) {
      return res
        .status(400)
        .json({ message: "invalid credentials...user not found" });
    }

    req.user = user;
    req.userId = user.id;

    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export { verifyAuthToken };
