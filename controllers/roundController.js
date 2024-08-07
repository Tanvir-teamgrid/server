const Round = require("../model/roundSchema");
const Season = require("../model/seasonSchema");
const slugify = require("slugify");

class roundController {
  
  static addRound = async (req, res) => {
    try {
      const { name, playDate, biddingEndDate, totalMatch, seasonId, roundNumber } = req.body;

      // Validate required fields
      if (!name || !playDate || !biddingEndDate || !totalMatch || !seasonId || !roundNumber) {
        return res.status(400).json({ error: "All fields are required" });
      }

      // Validate and parse date fields
      const now = new Date();
      const playDateObj = new Date(playDate);
      const biddingEndDateObj = new Date(biddingEndDate);

      // Check if dates are valid
      if (isNaN(playDateObj.getTime()) || isNaN(biddingEndDateObj.getTime())) {
        return res.status(400).json({ error: "Invalid date format" });
      }

      if (playDateObj < now || biddingEndDateObj < now) {
        return res.status(400).json({ error: "Play date and bidding end date must be in the future" });
      }

      // Validate totalMatch
      if (totalMatch <= 0) {
        return res.status(400).json({ error: "Total match must be greater than 0" });
      }

      // Check if season exists
      const season = await Season.findById(seasonId);
      if (!season) {
        return res.status(404).json({ message: "Season not found" });
      }

      // Create and save the round
      const slug = slugify(name, { lower: true });
      const round = new Round({
        name,
        slug,
        playDate: playDateObj,
        biddingEndDate: biddingEndDateObj,
        totalMatch,
        seasonId,
        roundNumber,
      });

      const result = await round.save();
      return res.status(201).json({ message: "Round created successfully", data: result });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
  static viewRound = async (req, res) => {
    try {
      const roundList = await Round.find().exec();
      res.json(roundList);
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: "Error fetching roles", error: error.message });
    }
  };

  static deleteRound = async (req, res) => {
    try {
      const roundId = req.params.id;
      if (!roundId) {
        return res.status(400).json({ message: "round ID is required" });
      }

      const user = await Round.deleteOne({ _id: roundId });
      if (user.deletedCount === 0) {
        return res.status(404).json({ message: "round not found" });
      }

      res.json({ message: "round deleted successfully" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Error deleting round", error: error.message });
    }
  };

  static updateRound = async (req, res) => {
    try {
      const roundId = req.params.id;
      const data = req.body;
      const roundData = await Round.findById(roundId);
      roundData.name = data.name;
      roundData.totalMatch = data.totalMatch;

      const update = await roundData.save();
      res
        .status(200)
        .json({ message: "update done successfully", info: update });
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  };

  static searchRoundBySlug = async (req, res) => {
    try {
      const slug = req.params.slug;
      const round = await Round.findOne({ slug });
      if (!round) {
        res.status(404).send({ message: "round not found" });
      } else {
        res.send(round);
      }
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: "Error fetching round" });
    }
  };
  static searchRoundById = async (req, res) => {
    try {
      let roundId = req.params.id;
      const result = await Round.findById(roundId);
      res.status(200).json({ data: result });
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  };
}

module.exports = roundController;
