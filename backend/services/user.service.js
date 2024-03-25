const { userSchema } = require("../model")
const { createHmac } = require('crypto')
const JWT = require('jsonwebtoken');
const { userController } = require("../controller");

const createUser = (fullName, email, password,role,profileImage) => {
  return userSchema.create({ fullName, email, password,role,profileImage });
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
    return  false;
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

const getUsers = () =>{
  return userSchema.find({})
}

const updateUser = (_id,body,image)=>{
  return userSchema.findByIdAndUpdate({_id},{
    profileImage:image,
    fullName: body.fullName,
    email: body.email
  })
}

const changePassword = (_id,newPassword) =>{
  return userSchema.findByIdAndUpdate({_id},{
    password:newPassword
  })
}

const deleteUser = (_id) =>{
  return userSchema.findByIdAndDelete(_id);
}
module.exports = { createUser, findUser, verifyPassword, createToken, getProfile,getUsers,deleteUser ,updateUser ,changePassword }