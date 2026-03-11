const userModel = require("../models/auth.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function registerController(req, res, next) {
  try {
    const { username, email, password } = req.body;

    const isUserExist = await userModel.findOne({
      $or: [{ username }, { email }],
    });

    if (isUserExist) {
      return res.status(400).json({
        message: "User already Exists with this email address.",
      });
    }

    const hash = await bcrypt.hash(password, 10);
    const user = await userModel.create({ username, email, password: hash });

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET
    );
    res.cookie("token", token, { httpOnly: true });

    return res.status(200).json({
      message: "User Register Successfully.",
      user: { email: user.email, username: user.username },
    });
  } catch (err) {
    next(err);
  }
}

async function loginController(req, res, next) {
  try {
    const { username, email, password } = req.body;

    const user = await userModel.findOne({
      $or: [{ username }, { email }],
    });
    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials." });
    }

    const isCorrectPassword = await bcrypt.compare(password, user.password);
    if (!isCorrectPassword) {
      return res.status(400).json({ message: "Invalid Credentials." });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET
    );
    res.cookie("token", token, { httpOnly: true });

    return res.status(200).json({
      message: "User Login Successfully.",
      user: { email: user.email, username: user.username },
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { registerController, loginController };

async function loginController(req, res) {
  const { username, email, password } = req.body;

  const user = await userModel.findOne({
    $or: [{ username: username }, { email: email }],
  });
  if (!user) {
    return res.status(400).json({
      message: "Invalid Credentials.",
    });
  }

  const isCorrectPassword = await bcrypt.compare(password, user.password);

  if (!isCorrectPassword) {
    return res.status(400).json({
      message: "Invalid Credentials.",
    });
  }
  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET,
  );

  res.cookie("token", token);

  res.status(200).json({
    message: "User Login Successfully.",
    user: {
      email: user.email,
      username: user.username,
    },
  });
}

module.exports = {
  registerController,
  loginController,
};
