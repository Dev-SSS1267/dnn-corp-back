const mongoose = require("mongoose");

const PressReleaseSchema = new mongoose.Schema({
  author: { type: String },
  title: { type: String, required: true },
  content: { type: String, required: true },
  createDate: { type: Date, default: Date.now },
  img: { type: String, required: false },
});

module.exports = mongoose.model("PressRelease", PressReleaseSchema);