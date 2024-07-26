const mongoose = require("mongoose");
const team = require("./teams");
const userSchema = mongoose.Schema({
  region: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "regions",
  },
  round: {
    type: String,
    required: true,
  },
  teamOneId: {
    type: mongoose.Schema.Types.ObjectId,
    required: "teams",
  },
  teamTwoId: {
    type: mongoose.Schema.Types.ObjectId,
    required: "teams",
  },
  team1score: {
    type: Number,
    required: true,
  },
  team2score: {
    type: Number,
    required: true,
  },
  finalscore: {
    type: Number,
    required: true,
  },
  decidedWinner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "teams",
  },
  status: Number,
  roundSlug: {
    type: String,
  },
  zoneSlug: {
    type: String,
  },
  matchNo: {
    type: Number,
  },
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
});

const userModel = mongoose.model("matches", userSchema);

module.exports = userModel;
console.log("user model is ready to use");
