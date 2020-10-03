const jwt = require("jsonwebtoken");
const User = require("../models/users");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, "secretKey");
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });
    if(!user) {
        throw new Error();
    }
    req.user = user;
    next()
  } catch {
    res.status(401).send({ error: "Unauthenticated request" });
  }
};
module.exports = auth;
