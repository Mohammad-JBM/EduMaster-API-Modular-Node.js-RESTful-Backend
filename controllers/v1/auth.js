// UserModel
const userModel = require("./../../models/user");
// Validation
const registerValidation = require("./../../validators/register");
// banUser
const banUserModel = require("./../../models/ban-phone");
// bcrypt
const bcrypt = require("bcrypt");
// JWT
const jwt = require("jsonwebtoken");


// Controllers
// Register
exports.register = async (req, res) => {
  const validationResult = registerValidation(req.body);
  if (validationResult !== true) {
    return res.status(422).json(validationResult);
  }

  const { name, username, email, password, phone } = req.body;

  const isUserExists = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (isUserExists) {
    return res.status(409).json({
      message: "UserName or Email is Dublicated",
    });
  }

  const isUserBan = await banUserModel.find({ phone });

  if (isUserBan.length) {
    return res.status(409).json({ message: "This Phone Number Baned !" })
  }

  const countOfUser = await userModel.countDocuments();

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await userModel.create({
    email,
    username,
    name,
    phone,
    password: hashedPassword,
    role: countOfUser > 0 ? "USER" : "ADMIN",
  });

  const userObject = user.toObject();
  Reflect.deleteProperty(userObject, "password");

  const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "30 day",
  });

  return res.status(201).json({
    user: userObject, accessToken
  })
};

// Login
exports.login = async (req, res) => {
  const { identifier, password } = req.body;
  // Email-UserName-Validator
  const user = await userModel.findOne({ $or: [{ email: identifier }, { username: identifier }] });
  if (!user) {
    return res.status(401).json({
      message: "There is no User with this UserName or Email."
    })
  }
  // Password-Check
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({
      message: "Password is Not Valid !!"
    });
  }
  // JWT Access Token
  const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "30 day"
  });

  return res.json({ accessToken });
};

exports.getMe = async (req, res) => { };