const User = require("../models/User");

const bcrypt = require("bcrypt");

const mailer = require("nodemailer");

const { sign } = require("jsonwebtoken");

const transporter = mailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAILID,
    pass: process.env.APPPSWD,
  },
});

exports.getUser = async (req, res) => {
  const listOfUsers = await User.find();
  res.status(200).json(listOfUsers);
};

exports.registerAdmin = async (req, res) => {
  const { name, address, email, contact_no, password } = req.body;
  const user = await User.find({ email: email });
  if (user.length > 0) {
    res.status(403).json({
      error: true,
      message: `Email: ${email} already exists`,
    });
  } else {
    bcrypt.hash(password, 10).then(async (hash) => {
      const userDto = new User({
        name: name,
        address: address,
        role: "admin",
        email: email,
        contact_no: contact_no,
        password: hash,
      });
      try {
        await userDto.save();
        res
          .status(200)
          .json({ success: true, message: "Successfully Registered admin!!" });
      } catch (err) {
        res.status(400).json({
          error: true,
          message: "Some unusal error occured!",
          type: err,
        });
      }
    });
  }
};

exports.registerUser = async (req, res) => {
  const { name, address, email, contact_no, password, role } = req.body;
  const user = await User.find({ email: email });
  if (user.length > 0) {
    res.status(403).json({
      error: true,
      message: `Email: ${email} already exists`,
    });
  } else {
    bcrypt.hash(password, 10).then(async (hash) => {
      const userDto = new User({
        name: name,
        address: address,
        role: role,
        email: email,
        contact_no: contact_no,
        password: hash,
      });
      try {
        await userDto.save();
        res
          .status(200)
          .json({ success: true, message: "Successfully Registered user!!" });
      } catch (err) {
        res.status(400).json({
          error: true,
          message: "Some unusal error occured!",
          type: err,
        });
      }
    });
  }
};

exports.loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ email: username });
    const listOfUsers = await User.find({ email: username });
    if (!user) {
      res.status(404).json({
        error: true,
        message: `User with username: ${username} Doesnot Exist`,
        data: listOfUsers,
      });
    } else {
      bcrypt.compare(password, user?.password).then((match) => {
        if (!match) {
          res.status(500).json({
            error: true,
            message: "Wrong username and password Combination",
          });
        } else {
          const today = new Date();
          const expirationDate = new Date(today);
          expirationDate.setDate(today.getDate() + 7);
          const accessToken = sign(
            {
              username: user.email,
              id: user.id,
              exp: parseInt(expirationDate.getTime() / 1000, 10),
            },
            process.env.SECRETE_KEY
          );
          res
            .status(200)
            .json({ success: true, data: { token: "Bearer " + accessToken } });
        }
      });
    }
  } catch (err) {
    res.status(500).json({
      error: true,
      message: "Internal error please try again",
    });
  }
};

exports.forgetPassword = async (req, res) => {
  const email = req.query.email;
  const user = await User.findOne({ email: email });

  if (!user) {
    res.status(404).json({ error: true, message: "User Does not Exist" });
  } else {
    const mailOptions = {
      from: "baseapp12@gmail.com",
      to: `${email}`,
      subject: "Reset Password on your User account",
      text: `Use ${user._id} as user token for reseting your password.`,
    };
    transporter.sendMail(mailOptions, function (error, _info) {
      if (error) {
        res.status(500).json({
          error: true,
          message: `Could not send email to email: ${email}`,
          type: error,
        });
      } else {
        res.status(200).json({
          success: true,
          message: `An email has been sent to email: ${email}`,
        });
      }
    });
  }
};

exports.resetPassword = async (req, res) => {
  const { password, id } = req.body;
  const user = await User.findOne({ _id: id });

  if (!user) {
    res.status(404).json({ error: true, message: "User not found!!" });
  } else {
    bcrypt.hash(password, 10).then((hash) => {
      User.findByIdAndUpdate(
        req.query.id,
        { $set: { password: hash } },
        { new: true },
        (error) => {
          if (error) {
            res.send({
              error: true,
              message: "Some unusal error has occure",
              type: "error",
            });
          } else {
            res.status(200).json({
              success: true,
              message: "Successfully Reset your password!!",
            });
          }
        }
      );
    });
  }
};
