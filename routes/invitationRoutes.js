const express = require("express");
const { addinvitation } = require("../controllers/invitationController");

const Router = express.Router();

Router.post("/league/:id/invite", addinvitation);
// Router.get("/getrole", getRoles);

module.exports = Router;
console.log("router invitation is ready to use");