import jwt from "jsonwebtoken";

const config = process.env;

const verifyToken = (req, res, next) => {
  var isValidAccessToken = true;
  const accessToken = req.header("Access-Token"),
    refreshToken = req.header("Refresh-Token");

  if (!accessToken)
    return res
      .status(401)
      .send("An access token is required for authentication");

  try {
    const temp = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
  } catch (err) {
    isValidAccessToken = false;
  }
  if (isValidAccessToken != true) {
    if (!refreshToken) return res.status(401).send("Refresh token is required");
    try {
      const decoded = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET
      );
      const accessToken = jwt.sign(
        { username: req.body.username },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "15m",
        }
      );
      res.setHeader("Access-Token", accessToken);
      res.setHeader("Refresh-Token", refreshToken);
      req.user = decoded;
    } catch (err) {
      return res.status(401).send("Invalid refresh token");
    }
  }
  return next();
};

export default verifyToken;
