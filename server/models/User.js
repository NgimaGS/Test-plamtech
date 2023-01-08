const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: String,
  profile_image: {
    data: Buffer,
    contentType: String,
  },
  role: { type: String, enum: ["admin", "user"], default: "user" },
  email: { type: String, unique: true, required: true },
  contact_no: String,
  password: { type: String, required: true },
});

module.exports = mongoose.model("users", userSchema);
