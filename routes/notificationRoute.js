const express = require("express");
const createnotification = require("../controllers/notificationController");

const Router = express.Router();

Router.post("/addnotification", createnotification);
//Router.get("/getrole", getRoles);

module.exports = Router;
console.log("Notification router is ready to use");
