const express = require("express");
const auth = require("../middleware/authMiddleware");
const { applyLeave, getMyLeaves, getLeaveBalance } = require("../controllers/leaveController");

const router = express.Router();
// Apply for leave by User
router.post("/", auth, applyLeave);
// Get logged in user's leaves
router.get("/my", auth, getMyLeaves);
// Get leave balance
router.get("/balance", auth, getLeaveBalance);

module.exports = router;