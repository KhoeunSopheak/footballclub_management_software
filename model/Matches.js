const mongoose = require("mongoose");

const MatchSchema = new mongoose.Schema({
    // id: {type: Number, required: true, unique: true,},
  homeTeam: { type: String, required: true },
  awayTeam: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  score: { type: String, default: "0-0" },
});

const Match = mongoose.model("Match", MatchSchema);

module.exports = Match;
