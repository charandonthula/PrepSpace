const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const signupUser = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    await newUser.save();
    res.json({
      message: "User created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Signup failed",
    });
  }
};
const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password,
    );
    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Invalid password",
      });
    }
    // const token = jwt.sign(
    //   {
    //     userId: user._id,
    //   },

    //   "secretkey",
    // );
    const token = jwt.sign(
      {
        userId: user._id,
      },

      process.env.JWT_SECRET,
    );
    res.json({
      message: "Login successful",
      token: token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Login failed",
    });
  }
};
module.exports = {
  signupUser,
  loginUser,
};
