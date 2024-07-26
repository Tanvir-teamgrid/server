const mongoose = require('mongoose');

const leagueinvitation = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    
  },
  userId: { type: mongoose.Schema.Types.ObjectId, //reference to user collection
    ref: "users",
    required: true,
  },
  invitedBy: {
    type: mongoose.Schema.Types.ObjectId, //reference to user collection
    ref: "users",
    required: true,
  },
  leagueId: {
    type: mongoose.Schema.Types.ObjectId, //reference to league collection
    ref: "leagues",
    required: true,
  },
  status: {
    type: Number,
    required: true
  },
  created: {
     type: Date, 
     default: Date.now },
  updated: { 
    type: Date, 
    default: Date.now },
});

const model = mongoose.model('leagueinvitations', leagueinvitation);
module.exports = model;