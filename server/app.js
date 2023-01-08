const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const multer = require("multer");
const cors = require("cors");
require("dotenv/config");

const app = express();

app.use(morgan("dev"));

app.use(express.json());
app.use(cors());

const Storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const userRoute = require("./routes/users");

const authRoute = require("./routes/auth");

app.use("/user", userRoute);
app.use("/", authRoute);
mongoose.set("strictQuery", true);

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () =>
  console.log("Successfully connected to DB!")
);

app.listen(5000);
