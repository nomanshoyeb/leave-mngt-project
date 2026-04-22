import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LeaveForm from "../components/LeaveForm";
import LeaveHistory from "../components/LeaveHistory";

function Dashboard() {
  const navigate = useNavigate();
  const [refresh, setRefresh] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between bg-white shadow px-6 py-4">
        <h2 className="text-2xl font-bold text-gray-800">User Dashboard</h2>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
      {/* Content */}
      <div className="p-6 max-w-5xl mx-auto space-y-6">
        {/* Leave Form Section */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">
            Apply for Leave
          </h3>
          <LeaveForm onSuccess={() => setRefresh(!refresh)} />
        </div>
        {/* Leave History Section */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">
            Leave History
          </h3>
          <LeaveHistory refresh={refresh} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;