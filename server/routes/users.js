const express = require("express");
const multer = require("multer");
const router = express.Router();
const { validateToken } = require("../middlewares/AuthMiddleware");
const {
  getUser,
  addUser,
  updateUser,
  deleteUser,
  getUserMetaData,
  uploadProfile,
} = require("../controllers/Users");

const Storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: Storage });

router.use(validateToken);

router.route("/").get(getUser);

router.route("/metadata").get(getUserMetaData);

router.route("/").post(addUser);

router.route("/upload").post(uploadProfile);

router.route("/").put(updateUser);

router.route("/").delete(deleteUser);

module.exports = router;
