const Match = require("../model/Matches");

// Create a new match
exports.createMatch = async (req, res) => {
  try {
    // const { id, tittle, homeTeam , awayTeam , date , location, score } = req.body;
    
    const match = await Match.create(req.body);
    res.status(201).json({ success: true, data: match });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get all matches
exports.getMatches = async (req, res) => {
  try {
    const matches = await Match.find();
    res.status(200).json({ success: true, data: matches });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get a match by ID
exports.getMatchById = async (req, res) => {
  try {
    const match = await Match.findById(req.params.id);
    if (!match) {
      return res.status(404).json({ success: false, message: "Match not found" });
    }
    res.status(200).json({ success: true, data: match });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Update a match
exports.updateMatch = async (req, res) => {
  try {
    const match = await Match.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!match) {
      return res.status(404).json({ success: false, message: "Match not found" });
    }
    res.status(200).json({ success: true, data: match });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Delete a match
exports.deleteMatch = async (req, res) => {
  try {
    const match = await Match.findByIdAndDelete(req.params.id);
    if (!match) {
      return res.status(404).json({ success: false, message: "Match not found" });
    }
    res.status(200).json({ success: true, message: "Match deleted" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
