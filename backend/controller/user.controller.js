const uploadImage = require("../middleware/cloudinary");
const { userServices } = require("../services");


const createUser = async (req, res) => {
  try {
    const { fullName, email, password, role } = req.body;
    const path = req.file.path;
    // console.log(img);
    if (!fullName || !email || !password || !path) {
      res.status(400).json({ message: "Missing fields" });
    }

    const userExit = await userServices.findUser(email);
    // console.log(Object.keys(userExit).length);

    if (userExit && Object.keys(userExit).length > 0) {
      return res.status(409).json({ message: "Email already in use!" });
    }

    const image = await uploadImage(path);
    // console.log(iamage); 

    const user = await userServices.createUser(fullName, email, password, role, image.url);
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
      res.status(400).json({ message: 'Please provide an email and a password' });
    }
    const user = await userServices.findUser(email);
    // console.log(user);
    if (user.length === 0) {
      res.status(401).json({ message: "can't find this user" })
    } else {
      const verifyPassword = await userServices.verifyPassword(user[0], password)
      // console.log(verifyPassword);

      const token = userServices.createToken(verifyPassword);
      // console.log(token);

      if (verifyPassword) {
        return res.status(200).cookie('token', token, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true }).json({
          success: true,
          token
        })
      } else {
        res.status(401).json({
          message: "Invalid password"
        })
      }
    }

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

const getUsers = async (req, res) => {
  try {
    const users = await userServices.getUsers();
    res.status(200).json({ success: true, users })
  } catch (error) {
    console.log(error);
  }
}

const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const imagePath = req.file.path;
    // console.log(imagePath, body, id);

    const image = await uploadImage(imagePath);
    // console.log(image.url);

    if (id.length !== 24) {
      res.status(400).json({ message: "Invalid ID" })
    }

    const updated = await userServices.updateUser(id, body, image.url);

    if (!updated) {
      return res.status(404).json({ message: "No User Found with this ID" })
    } else {
      res.status(200).json({ message: "update success", updated })
    }

  } catch (error) {
    console.log(error);
  }
}

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;

    if (id.length !== 24) {
      res.status(400).json({ message: "Invalid ID" })
    }
    const deletedUser = await userServices.deleteUser(id);

    res.status(204).json({ message: "user deleted success", deleted: deletedUser });
  } catch (error) {
    console.log(error);
  }
}


const changePassword = async (req, res) => {
  try {
    const id = req.params.id;
    const { newPassword } = req.body;
    // console.log(id, newPassword);
    if (!id || !newPassword) {
      res.status(400).json({ message: "please provide all fields" })
    }

    if (id.length !== 24) {
      res.status(400).json({ message: "Invalid ID" })
    }

    const changed = await userServices.changePassword(id, newPassword)

    // console.log(changed);
    if (!changed) {
      res.status(400).json({ message: "Invalid ID" })
    } else {
      res.status(200).json({ message: "Successfully Changed Password!" })
    }

  } catch (error) {
    console.log(error);
  }
}

module.exports = { createUser, authenticateUser, getProfile, getUsers, deleteUser, updateUser, changePassword }