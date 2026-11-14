const AppError = require("../utils/AppError");
const User = require("./../models/user");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const verifyAsync = promisify(jwt.verify);

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

exports.protect = async (req, res, next) => {
  let token;

  // check for headers and check for authorization present
  if (req.headers && req.headers.authorization) {
    token = req.headers.authorization.split(" ")[1];
  }

  // if not user is not logged in unauthorized
  if (!token) {
    return next(
      new AppError("Your are not logged in! Please login to get access", 401),
    );
  }

  // create a test signature and verify with original signature
  let decoded = await verifyAsync(token, process.env.JWT_SECRET);

  const currentUser = await User.findById(decoded.id);

  // if user don't exists then token should be invalid
  if (!currentUser) {
    return next(
      new AppError(`User belonging to the token does not exists `, 401),
    );
  }

  // check if user changed password after the token issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError(
        `User recently changed the password Please login again`,
        401,
      ),
    );
  }

  req.user = currentUser;
  next();
};
