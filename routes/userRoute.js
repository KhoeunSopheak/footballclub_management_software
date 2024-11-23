const express = require("express");
const verifyToken = require("../middleware/authMiddleware");
const {
  GetUserProfile,
  UpdateUser,
  DeleteUser,
} = require("../controllers/userCtl");

const router = express.Router();

// Admin routes
// router.use(verifyToken("admin"));
// router.get("/admin", GetallUser);
// router.route("/:id").get(GetuserbyId).put(UpdateUser).delete(DeleteUser);

// User routes

router.get("/me", verifyToken("user"), GetUserProfile);
router.put("/update-profile", verifyToken("user"), UpdateUser);
router.delete("/delete-profile", verifyToken("user"), DeleteUser);

module.exports = router;
