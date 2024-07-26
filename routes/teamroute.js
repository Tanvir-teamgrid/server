const express = require("express");
const upload = require("../middleware/fileUpload");
const {
  addteam,
  displayall,
  deleteteam,
  updateTeam,
  displaybyId,
} = require("../controllers/TeamController");
const router = express.Router();

router.post("/createteam", addteam);
router.get("/display", displayall);
router.get("/display/:id", displaybyId);
router.delete("/delete/:id", deleteteam);
router.put("/update/:id", updateTeam);

module.exports = router;
