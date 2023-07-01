const jwt = require("jsonwebtoken");
const { User } = require("../auth/models");
const { Key } = require("../auth/controllers");

const is_authenticated = async (req, res, next) => {
  console.log(req.headers.authorization);
  var token = req.headers.authorization;
  if (!token) {
    return res.json({ status: "error", msg: "token required" });
  }
  try {
    var user = jwt.verify(token, Key);
    if (user && user._id) {
      user = await User.findById(user._id);
      if (!user) {
        return res.json({ status: "error", msg: "user invalid" });
      }
      req.body.user_id = user._id;
      req.user = user;
    } else {
      return res.json({ status: "error", msg: "token invalid" });
    }
  } catch {
    return res.json({ status: "error", msg: "token invalid" });
  }
  next();
};

module.exports = { is_authenticated };