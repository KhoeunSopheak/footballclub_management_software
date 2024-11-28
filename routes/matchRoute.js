const express = require("express");
const verifyToken = require("../middleware/authMiddleware");

const {
  createMatch,
  getMatches,
  getMatchById,
  updateMatch,
  deleteMatch,
} = require("../controllers/matchesControllers");

const router = express.Router();

router.post("/matches",verifyToken ("admin"), createMatch); // Create a new match
router.get("/allMatches",verifyToken ("admin","user"), getMatches); // Get all matches
router.get("/:id",verifyToken ("admin"), getMatchById); // Get match by ID 
router.put("/:id",verifyToken ("admin"), updateMatch); // Update match by ID
router.delete("/:id",verifyToken ("admin"), deleteMatch); // Delete match by ID

module.exports = router;
