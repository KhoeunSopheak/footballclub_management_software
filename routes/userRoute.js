const express = require("express");
const verifyToken = require("../middleware/authMiddleware");
const { GetallUser, GetuserbyId, UpdateUser, DeleteUser } = require("../controllers/userCtl");

const router = express.Router();

// Admin routes
router.use(verifyToken("admin"));
router.get("/admin", GetallUser);
router.route("/:id").get(GetuserbyId).put(UpdateUser).delete(DeleteUser);

// User routes
router.get("/:id", verifyToken("user"), GetuserbyId);

module.exports = router;
