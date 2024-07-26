const mongoose = require("mongoose");

const adminnotice = new mongoose.Schema({
  notificationTitle: {
    type: String,
    required: true,
  },
  notificationText: {
    type: String,
    required: true,
  },
  status: {
    type: Number,
    default: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
});

const admin = mongoose.model("adminnotifications", adminnotice);
module.exports = admin;
