import { verifyToken } from "../service/auth.service.js";

const verifyAuthToken = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    console.log(token, "inside verify Auth Token");

    if (!token) {
      return res
        .status(400)
        .json({ message: "invalid credentials...token not found" });
    }
    const user = await verifyToken(token);
    console.log(user, "inside verify Auth Token");

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
