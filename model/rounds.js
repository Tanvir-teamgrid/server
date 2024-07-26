const mongoose = require("mongoose");
const season = require("./season");

const regionSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
  },
  playDate: {
    type: String,
  },
  biddingEndDate: {
    type: String,
  },
  status: {
    type: Boolean,
    default: true,
  },
  seasonId: {
    type: mongoose.Schema.Types.ObjectId, //reference to season collection
    ref: "seasons",
    required: true,
  },

  totalMatch: {
    type: Number,
  },
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
});

const model = mongoose.model("rounds", regionSchema);

module.exports = model;
