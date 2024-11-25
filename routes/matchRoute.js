const express = require("express");
const {
  createMatch,
  getMatches,
  getMatchById,
  updateMatch,
  deleteMatch,
} = require("../controllers/matchesControllers");

const router = express.Router();

router.post("/matches", createMatch); // Create a new match
router.get("/allMatches", getMatches); // Get all matches
router.get("/:id", getMatchById); // Get match by ID 
router.put("/:id", updateMatch); // Update match by ID
router.delete("/:id", deleteMatch); // Delete match by ID

module.exports = router;
