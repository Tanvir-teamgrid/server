const express = require("express");
const Router = express.Router();
const {
  adduser,
  login,
  getuser,
  getuserById,
  deleteUser,
  updateUser,
} = require("../controllers/userController");
const checkUser = require("../middleware/checkUser");

Router.post("/adduser", adduser);
Router.post("/loginuser", login);
Router.get("/viewuser", checkUser, getuser);
Router.get("/viewbyid/:id", getuserById);
Router.put("/updateid/:id", updateUser);
Router.delete("/delete/:id", deleteUser);

module.exports = Router;
console.log("router is ready to use");
