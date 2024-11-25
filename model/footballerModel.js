const mongoose = require('mongoose');

const footballerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  position: { type: String, required: true },
  team: { type: String, required: true },
  stats: {
  matches: { type: Number, default: 0 },
  goals: { type: Number, default: 0 },
  assists: { type: Number, default: 0 },
  },
});

const Footballer = mongoose.model('Footballer', footballerSchema);
module.exports = Footballer;
