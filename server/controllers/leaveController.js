const Leave = require("../models/Leave");
const User = require("../models/User"); 

// Apply for leave by User
exports.applyLeave = async (req, res) => {
  try {
    const { fromDate, toDate, reason } = req.body;

    if (!fromDate || !toDate || !reason) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const leave = await Leave.create({
      userId: req.user.id,
      fromDate,
      toDate,
      reason,
      status: "pending"
    });

    res.status(201).json(leave);

  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

// Get logged-in user's leaves
exports.getMyLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find({ userId: req.user.id })
      .sort({ createdAt: -1 });

    res.json(leaves);

  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

// Get all leaves by Admin
exports.getAllLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find()
      .populate("userId", "name email")
      .sort({ createdAt: -1 });
    res.json(leaves);
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};
// Approve or Reject leave by Admin
exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({ msg: "Invalid status" });
    }

    const leave = await Leave.findById(req.params.id);

    if (!leave) {
      return res.status(404).json({ msg: "Leave not found" });
    }

    // IF APPROVED then deduct leave
    if (status === "approved") {
      const user = await User.findById(leave.userId);

      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }
      const from = new Date(leave.fromDate);
      const to = new Date(leave.toDate);
      const diffTime = to - from;
      const days = diffTime / (1000 * 60 * 60 * 24) + 1;

      if (user.leaveBalance - user.usedLeaves < days) {
        return res.status(400).json({
          msg: "Not enough leave balance"
        });
      }

      user.usedLeaves += days;
      await user.save();
    }

    leave.status = status;
    await leave.save();

    res.json({
      msg: "Status updated successfully",
      leave
    });

  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

// Get Leave Balance by User
exports.getLeaveBalance = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const total = user.leaveBalance;
    const used = user.usedLeaves;
    const remaining = total - used;

    res.json({
      total,
      used,
      remaining
    });

  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};