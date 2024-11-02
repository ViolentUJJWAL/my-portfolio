const jwt = require("jsonwebtoken");
const user = require("../models/userModels");


const logout = async (res) => {
  res.cookie("token", "", {
    maxAge: 0,
    httpOnly: true,
    secure: true,
    sameSite: "strict"
  })
}


const jwtToken = async (req, res, next) => {
  let token = req.cookies.token;
  console.log(token);
  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    if (!decoded) {
      await logout(res)
      return res.status(401).send({
        message: "Not authorized, token failed: please relogin",
      });
    }
    const userData = await user.findById(decoded.id);
    if (!userData) {
      await logout(res)
      return res.status(404).send({
        message: "User not found please logout and relogin",
      });
    }
    if (!userData.isActive) {
      await logout(res)
      return res.status(403).send({
        message:
          "Your account has been blocked. Please contact the administrator.",
      });
    }
    req.user = userData;
    next();
  } catch (err) {
    await logout(res)
    return res.status(401).send({
      message: "Not authorized, token failed",
    });
  }
};

module.exports = jwtToken;
