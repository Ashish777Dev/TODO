const AppError = require("../utils/AppError");
const User = require("./../models/user");
const jwt = require("jsonwebtoken");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// SIGNUP NEW USER

exports.signup = async (req, res) => {
  // create a new User
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  // create a token
  const token = signToken(newUser._id);

  res.status(201).json({
    status: "success",
    token,
    data: {
      user: newUser,
    },
  });
};

// LOGIN USER
exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  // check if email and password exists
  if (!email || !password) {
    return next(new AppError(`Invalid email id and password`, 400));
  }

  // check user exist and password is correct

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError(`Incorrect  email or password`, 401));
  }

  // if everything ok give token to user
  const token = signToken(user._id);

  res.status(200).json({
    status: "success",
    data: {
      token,
    },
  });
};
