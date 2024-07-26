const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
    required: true,
  },
  status: {
    type: Number,
    required: true,
  },
  seasonId: {
    type: mongoose.Types.ObjectId,
    ref: "seasons",
  },
  seed: {
    type: Number,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

const userModel = mongoose.model("teams", userSchema);

module.exports = userModel;
console.log("user model is ready to use");
