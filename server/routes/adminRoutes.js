const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const {
  getAllLeaves,
  updateStatus,
} = require("../controllers/leaveController");

const router = express.Router();

// Admin dashboard
router.get("/dashboard", authMiddleware, adminMiddleware, (req, res) => {
  res.json({ msg: "Welcome Admin" });
});

// Get all leaves by Admin
router.get("/leaves", authMiddleware, adminMiddleware, getAllLeaves);

// Approve / Reject leave by Admin
router.put("/leaves/:id", authMiddleware, adminMiddleware, updateStatus);

module.exports = router;