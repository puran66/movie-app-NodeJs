const JWT = require('jsonwebtoken')

const authenticate = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      res.status(400).json({ message: "You are not logged in!" });
    }

    // Verify the token//
    const user = JWT.verify(token, process.env.SECRETKEYFORTOKEN);
    // console.log(user);

    req.user = user;
    next();

  } catch (error) {
    console.log("Error on authentication middleware", error);
  }
}

const checkAuth = ([...role]) => {
  try {
    return (req, res, next) => {
      let user = req.user;
      // console.log(role.includes(user.role));

      if (role.includes(user.role)) {
        return next();
      }

      res.status(400).json({
        message: "you are not  authorized"
      })
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = { authenticate, checkAuth };