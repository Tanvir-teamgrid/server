// routes.js
const express = require("express");
const {
  addzone,
  viewall,
  zonedelete,
  updatezone,
  searchzone,
  searchZoneBySlug,
} = require("../controller/ZoneController");
const router = express.Router();

router.post("/newzone", addzone);
router.get("/viewzone", viewall);
router.delete("/deletezone/:id", zonedelete);
router.put("/editzone/:id", updatezone);
router.get("/viewzonebyid/:id", searchzone);
router.get("/viewzonebyslug/:slug", searchZoneBySlug);

module.exports = router;
