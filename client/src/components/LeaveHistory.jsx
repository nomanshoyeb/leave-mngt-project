import { useEffect, useState } from "react";
import { getMyLeaves } from "../services/leaveService";

function LeaveHistory({ refresh }) {
  const [leaves, setLeaves] = useState([]);
  const fetchLeaves = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await getMyLeaves(token);
      setLeaves(res.data);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchLeaves();
  }, [refresh]); 

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4 text-gray-700">
        My Leaves
      </h3>

      <div className="space-y-4">
        {leaves.length === 0 ? (
          <p className="text-gray-500 text-sm">No leave records found.</p>
        ) : (
          leaves.map((leave) => (
            <div
              key={leave._id}
              className="bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition"
            >
              <div className="flex justify-between items-center mb-2">
                <p className="font-medium text-gray-800">
                  {leave.fromDate.split("T")[0]} → {leave.toDate.split("T")[0]}
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
              <p className="text-gray-600 text-sm">
                <span className="font-medium">Reason:</span> {leave.reason}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default LeaveHistory;