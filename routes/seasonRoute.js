// season routes.js
const express = require("express");
const {
  addseason,
  viewall,
  seasondelete,
  updateseason,
  searchseason,
} = require("../controllers/seasonController");
const router = express.Router();

router.post("/newseason", addseason);
router.get("/viewseason", viewall);
router.get("/viewseasonbyid/:id", searchseason);
router.delete("/deleteseason/:id", seasondelete);
router.put("/editseason/:id", updateseason);

module.exports = router;
