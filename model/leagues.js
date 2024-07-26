const mongoose = require("mongoose");
// const users =require("../model/userSchema");

const leagueSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  
  status: {
    type: Number,
    default:true,
  },
  created: {
    type: Number,
    default: true,
  },
  updated: {
    type: Number,
    default: true,
  },
  allowInvitation: {
    type: Boolean,
    default: false,
  },
});

const League = mongoose.model("leagues", leagueSchema);

module.exports = League;
