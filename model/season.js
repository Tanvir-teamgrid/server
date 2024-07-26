const mongoose = require("mongoose");

const seasonSchema = new mongoose.Schema({
  year: {
    type: Number,
    required: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
});

module.exports = mongoose.model("season", seasonSchema);
