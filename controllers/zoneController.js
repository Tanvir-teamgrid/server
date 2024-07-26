// zones.js schema
const Zone = require("../models/zones");

class userZone {
  static addzone = async (req, res) => {
    try {
      const { zoneName } = req.body;
      if (!zoneName) {
        console.log(zoneName);
        return res.status(400).json({ error: "Name  is required" });
      }
      const slug = slugify(zoneName);
      const zone = new Zone({ zoneName, slug });
      const result = await zone.save();
      res
        .status(201)
        .json({ message: "Zone created successfully", data: result });
    } catch (error) {
      console.error(error);
      res.status(404).json({ error: "Internal Server Error" });
    }
  };

  static viewall = async (req, res) => {
    try {
      const data = await Zone.find();
      res.status(200).json({ message: "view successful", info: data });
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  };

  static searchzone = async (req, res) => {
    try {
      let zoneid = req.params.id;
      const result = await Zone.findById(zoneid);
      res.status(200).json({ data: result });
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  };

  static zonedelete = async (req, res) => {
    try {
      const data = req.params.id;
      const result = await Zone.findByIdAndDelete(data);
      res
        .status(200)
        .json({ message: "zone deleted successfully", info: result });
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  };

  static updatezone = async (req, res) => {
    try {
      const zoneid = req.params.id;
      const data = req.body;
      const zonedata = await Zone.findById(zoneid);
      zonedata.zoneName = data.zoneName;
      // zonedata.slug = data.slug;
      zonedata.slug = slugify(data.zoneName);
      const update = await zonedata.save();
      res
        .status(200)
        .json({ message: "update done successfully", info: update });
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  };

  static searchZoneBySlug = async (req, res) => {
    try {
      const slug = req.params.slug;
      const zone = await Zone.findOne({ slug });
      if (!zone) {
        res.status(404).send({ message: "Zone not found" });
      } else {
        res.send(zone);
      }
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: "Error fetching zone" });
    }
  };
}

module.exports = userZone;
