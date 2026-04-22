import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LeaveForm from "../components/LeaveForm";
import LeaveHistory from "../components/LeaveHistory";
import { getLeaveBalance } from "../services/leaveService";

function Dashboard() {
  const navigate = useNavigate();
  const [refresh, setRefresh] = useState(false); 
  const [balance, setBalance] = useState({
    total: 0,
    used: 0,
    remaining: 0,
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  // FETCH BALANCE
  useEffect(() => {
    const fetchBalance = async () => {
      const token = localStorage.getItem("token");

      try {
        const res = await getLeaveBalance(token);
        setBalance(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchBalance();
  }, [refresh]); // update when leave applied

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between bg-white shadow px-6 py-4">
        <h2 className="text-2xl font-bold text-gray-800">
          User Dashboard
        </h2>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
      {/* Content */}
      <div className="p-6 max-w-5xl mx-auto space-y-6">
        {/* LEAVE BALANCE CARD */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">
            Leave Balance
          </h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-blue-100 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Total</p>
              <p className="text-xl font-bold">{balance.total}</p>
            </div>
            <div className="bg-yellow-100 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Used</p>
              <p className="text-xl font-bold">{balance.used}</p>
            </div>
            <div className="bg-green-100 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Remaining</p>
              <p className="text-xl font-bold">{balance.remaining}</p>
            </div>
          </div>
        </div>
        {/* Leave Form */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">
            Apply for Leave
          </h3>
          <LeaveForm onSuccess={() => setRefresh(!refresh)} />
        </div>
        {/* Leave History */}
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