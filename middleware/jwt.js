const jwt = require("jsonwebtoken");

const createToken = (user, time) => {
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: time ? time : "1d",
    noTimestamp: true,
  });
  return accessToken;
};

const validateToken = (req, res, next) => {
  const accessToken = req.headers.authorization.split(" ")[1];
  if (!accessToken) {
    res.status(403).json({ message: "Please provide an token!" });
  } else {
    try {
      if (validToken.role !== "Admin") {
        throw new Error("You are not authorized to access this data!");
      } else {
        req.user = validToken;
        return next();
      }
    } catch (error) {
      next(error);
    }
  }
};

module.exports = {
  createToken,
  validateToken,
};
