const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token)
    return res.status(401).send({ auth: false, message: "No token provided." });

  try {
    const decoded = await jwt.verify(token, process.env.JWTPRIVATEKEY);
    req.userId = decoded._id;
    next();
  } catch (err) {
    return res
      .status(500)
      .send({ auth: false, message: "Failed to authenticate token." });
  }
};

module.exports = verifyToken;