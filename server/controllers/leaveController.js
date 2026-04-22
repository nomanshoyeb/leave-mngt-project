const Leave = require("../models/Leave");

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
      status: "pending" // ensure default
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

  // Get all leaves for Admin
exports.getAllLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find()
      .populate("userId", "name email") // for admin UI
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
    // validate status
    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({ msg: "Invalid status" });
    }
    const leave = await Leave.findById(req.params.id);
    if (!leave) {
      return res.status(404).json({ msg: "Leave not found" });
    }
    // update status
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