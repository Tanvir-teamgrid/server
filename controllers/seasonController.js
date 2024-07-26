const season = require("../model/season");

class SeasonController {
  static addseason = async (req, res) => {
    try {
      const { year } = req.body;
      if (!year) {
        return res.status(400).json({ error: "year  is required" });
      }
      const seasondata = new season({ year });
      const result = await seasondata.save();
      res
        .status(201)
        .json({ message: "season created successfully", data: result });
    } catch (error) {
      console.error(error);
      res.status(404).json({ error: "Internal Server Error" });
    }
  };
  static viewall = async (req, res) => {
    try {
      const data = await season.find();
      res.status(200).json({ message: "view successful", info: data });
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  };
  static searchseason = async (req, res) => {
    try {
      let seasonid = req.params.id;
      const result = await season.findById(seasonid);
      res.status(200).json({ seasondata: result });
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  };

  static seasondelete = async (req, res) => {
    try {
      const data = req.params.id;
      const result = await season.findByIdAndDelete(data);
      res
        .status(200)
        .json({ message: "season deleted successfully", info: result });
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  };

  static updateseason = async (req, res) => {
    try {
      const seasonid = req.params.id;
      const data = req.body;
      const seasondata = await season.findById(seasonid);
      seasondata.year = data.year;

      const update = await seasondata.save();
      res
        .status(200)
        .json({ message: "update done successfully", info: update });
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  };
}

module.exports = SeasonController;
