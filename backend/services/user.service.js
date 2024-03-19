const { userSchema } = require("../model")
const { createHmac } = require('crypto')
const JWT = require('jsonwebtoken')

const createUser = (fullName, email, password,profileImage) => {
  return userSchema.create({ fullName, email, password,profileImage });
}

const findUser = (email) => {
  return userSchema.find({ email });
}

const verifyPassword = (user, password) => {
  const salt = user.salt;
  const hashedPassword = user.password;

  const userhashedPassword = createHmac('sha256', salt).update(password).digest('hex')
  // console.log(hashedPassword);

  if (hashedPassword !== userhashedPassword) {
    throw new Error("Invalid Password");
  }

  return user;
}

const createToken = (user) => {
  try {
    const payload = {
      _id: user._id,
      profileImage: user.profileImage,
      fullName: user.fullName,
      email: user.email,
      role: user.role
    }
    // console.log(payload);

    return JWT.sign(payload, process.env.SECRETKEYFORTOKEN);
  }
  catch (err) {
    console.log(err);
  }
}

const getProfile = (token) => {
  return JWT.verify(token, process.env.SECRETKEYFORTOKEN);
}

module.exports = { createUser, findUser, verifyPassword, createToken, getProfile }