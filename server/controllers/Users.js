const User = require("../models/User");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const multer = require("multer");

const Storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: Storage }).single("image");

exports.getUser = async (req, res) => {
  try {
    const listOfUsers = await User.find({}, "-_id -password");
    res.status(200).json({ success: true, data: listOfUsers });
  } catch (err) {
    res.status(400).json({ error: true, message: "Server error occured" });
  }
};

exports.getUserMetaData = async (req, res) => {
  try {
    const accessToken = req.header("Authorization");
    const decoded = jwt.verify(
      accessToken.split(" ")[1],
      process.env.SECRETE_KEY
    );
    const userDetails = await User.findById(decoded.id, "-_id -password");

    res.status(200).json({ success: true, data: userDetails });
  } catch (err) {
    res
      .status(400)
      .json({ error: true, message: "Server error occured", type: err });
  }
};

exports.addUser = async (req, res) => {
  const user = new User({
    name: req.body.name,
    address: req.body.address,
    profile_image: req.body.profile,
    role: req.body.role,
    email: req.body.email,
    contact_no: req.body.contact_no,
    password: req.body.password,
  });
  try {
    const savedPost = await user.save();
    res.json({ success: true, data: savedPost });
  } catch (err) {
    res.json({ message: err, error: true });
  }
};

exports.updateUser = async (req, res) => {
  const { name, email, contact_no, role, address } = req.body;
  try {
    const updatedUser = await User.findOneAndUpdate(
      { email: req.body.email },
      {
        name: name,
        email: email,
        contact_no: contact_no,
        role: role,
        address: address,
      }
    );
    res.json({
      success: true,
      data: {
        name: updatedUser?.name,
        email: updatedUser?.email,
        contact_no: updatedUser?.contact_no,
        role: updatedUser?.role,
        address: updatedUser?.address,
      },
    });
  } catch (err) {
    res.json({ message: err, error: true });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const email = req.query.email;
    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(404).json({
        error: true,
        message: `User with email: ${email} doesnot exists`,
      });
    } else {
      await User.remove({ email: email });
      res.json({ success: true, message: "Successfully deleted user" });
    }
  } catch (err) {
    res.json({ message: err, error: true });
  }
};

exports.uploadProfile = async (req, res) => {
  try {
    await upload(req, res, (err) => {
      if (err) {
        console.log(err);
      } else {
        uploadFile(req, res);
      }
    });
  } catch (err) {
    res.status(400).json({ message: err, error: true });
  }
};

const uploadFile = async (req, res) => {
  const accessToken = req.header("Authorization");
  const decoded = jwt.verify(
    accessToken.split(" ")[1],
    process.env.SECRETE_KEY
  );
  const userDetails = await User.findById(decoded.id, "-_id -password");
  if (userDetails) {
    const image = {
      data: fs.readFileSync("uploads/" + req.file.filename),
      contentType: req.file.mimetype,
    };
    await User.findByIdAndUpdate({ _id: decoded.id }, { profile_image: image });
    res
      .status(200)
      .json({ message: "Successfully uploaded image", success: true });
  }
};
