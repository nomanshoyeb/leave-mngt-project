import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAllLeaves,
  updateLeaveStatus,
} from "../services/leaveService";

function AdminPanel() {
  const [leaves, setLeaves] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };
  const fetchLeaves = async () => {
    try {
      const res = await getAllLeaves(token);
      setLeaves(res.data);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchLeaves();
  }, []);
  const handleAction = async (id, status) => {
    try {
      await updateLeaveStatus(id, status, token);
      fetchLeaves();
    } catch (err) {
      alert("Error updating status");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between bg-white shadow px-6 py-4">
        <h2 className="text-2xl font-bold text-gray-800">Admin Panel</h2>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
      {/* Content */}
      <div className="p-6 max-w-6xl mx-auto space-y-4">
        {leaves.length === 0 ? (
          <p className="text-gray-500">No leave requests found.</p>
        ) : (
          leaves.map((leave) => (
            <div
              key={leave._id}
              className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition"
            >
              {/* Top Row */}
              <div className="flex justify-between items-center mb-2">
                <p className="font-semibold text-gray-800">
                  {leave.userId?.name}
                </p>
                <span
                  className={`text-xs px-3 py-1 rounded-full font-medium ${
                    leave.status === "approved"
                      ? "bg-green-100 text-green-700"
                      : leave.status === "rejected"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {leave.status}
                </span>
              </div>
              {/* Dates */}
              <p className="text-gray-700 text-sm mb-1">
                Duration: {leave.fromDate.split("T")[0]} →{" "}
                {leave.toDate.split("T")[0]}
              </p>
              {/* Reason */}
              <p className="text-gray-600 text-sm mb-3">
                <span className="font-medium">Reason:</span> {leave.reason}
              </p>
              {/* Actions  */}
              {leave.status === "pending" && (
                <div className="flex gap-3">
                  <button
                    onClick={() => handleAction(leave._id, "approved")}
                    className="bg-green-500 text-white px-4 py-1 rounded-lg hover:bg-green-600 transition"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleAction(leave._id, "rejected")}
                    className="bg-red-500 text-white px-4 py-1 rounded-lg hover:bg-red-600 transition"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default AdminPanel;