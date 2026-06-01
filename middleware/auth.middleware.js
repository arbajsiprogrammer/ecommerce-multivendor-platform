import { verifyToken } from "../service/auth.service.js";

const verifyAuthToken = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    console.log(token, "inside verify Auth Token");

    // if (!token) {
    //   return res
    //     .status(400)
    //     .json({ message: "invalid credentials...token not found" });
    // }
    let user = null;
    if (token) {
      user = await verifyToken(token);
      console.log(user, "inside verify Auth Token");
    }

    if (user) {
      req.user = user;
      req.userId = user.id;
      return next();
    }
    const refreshToken = req.cookies.refreshToken;
    console.log(refreshToken, "inside verify Auth Token for refresh token");
    if (!refreshToken) {
      return res
        .status(400)
        .json({ message: "invalid credentials...refresh token not found" });
    }
    const refreshUser = await verifyRefreshToken(refreshToken);
    console.log(refreshUser, "inside verify Auth Token for refresh token");
    if (!refreshUser) {
      return res
        .status(400)
        .json({ message: "invalid credentials...refresh token is invalid" });
    }
    req.user = refreshUser;
    req.userId = refreshUser.id;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export { verifyAuthToken };
