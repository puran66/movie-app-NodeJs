const mongoose = require('mongoose');
const { createHmac, randomBytes } = require('crypto')

const userSchema = new mongoose.Schema({
  profileImage: {
    type: String,
    required: true,
    default: '/public/images/OIP.jpeg'
  },
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  roll: {
    type: String,
    enum: ["ADMIN", "USER"],
    default: 'USER'
  },
  salt: {
    type: String
  },
  password: {
    type: String,
    required: true
  }
})

userSchema.pre('save', function (next) {
  const user = this;
  // console.log(user);

  if (!user.isModified('password')) return;

  const salt = randomBytes(16).toString();
  const hashedPassword = createHmac('sha256', salt).update(user.password).digest('hex')

  this.salt = salt;
  this.password = hashedPassword;

  next();
})

const User = mongoose.model("User", userSchema);
module.exports = User;