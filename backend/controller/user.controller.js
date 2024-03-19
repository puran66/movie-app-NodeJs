const { userServices } = require("../services");


const createUser = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    const img = req.file.path;
    console.log(img);
    if (!fullName || !email || !password || !img) {
      throw new Error("all inputs required!");
    }

    const userExit = await userServices.findUser(email);
    // console.log(Object.keys(userExit).length);

    if (userExit && Object.keys(userExit).length > 0) {
      return res.status(409).json({ message: "Email already in use!" });
    }

    const user = await userServices.createUser(fullName, email, password ,img);
    // console.log(user); 

    return res.status(201).json({ message: "User created successfully!", user })
  }
  catch (err) {
    console.log(err);
  }
}


const authenticateUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new Error("inputs required!");
    }
    const user = await userServices.findUser(email);
    // console.log(user);
    if (!user) {
      throw new Error("user not found!")
    }
    const verifyPassword = await userServices.verifyPassword(user[0], password)
    // console.log(verifyPassword);

    const token = userServices.createToken(verifyPassword);
    // console.log(token);

    res.status(200).cookie('token', token).json({
      success: true,
      token
    })
  }
  catch (err) {
    console.log(err);
  }
}

const getProfile = async (req, res) => {
  try {
    const token = req.cookies.token
    // console.log(token);

    const getUser = userServices.getProfile(token)

    res.status(200).json({
      success: true,
      user: getUser
    })

  } catch (err) {
    console.log(err);
  }
}

module.exports = { createUser, authenticateUser, getProfile }