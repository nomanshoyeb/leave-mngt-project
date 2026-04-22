import { useState } from "react";
import { applyLeave } from "../services/leaveService";

function LeaveForm({ onSuccess }) {
  const [form, setForm] = useState({
    fromDate: "",
    toDate: "",
    reason: "",
  });

  // Get today's date
  const today = new Date().toISOString().split("T")[0];
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      await applyLeave(form, token);
      alert("Leave Applied Successfully");
      onSuccess();
      setForm({
        fromDate: "",
        toDate: "",
        reason: "",
      });
    } catch (err) {
      alert("Error applying leave");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Date Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            From Date
          </label>
          <input
            type="date"
            value={form.fromDate}
            min={today} // restrict past dates
            onChange={(e) =>
              setForm({ ...form, fromDate: e.target.value })
            }
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            To Date
          </label>
          <input
            type="date"
            value={form.toDate}
            min={form.fromDate || today} // cannot use fromDate
            onChange={(e) =>
              setForm({ ...form, toDate: e.target.value })
            }
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>
      {/* Reason */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Reason
        </label>
        <input
          placeholder="Enter reason"
          value={form.reason}
          onChange={(e) =>
            setForm({ ...form, reason: e.target.value })
          }
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      {/* Button */}
      <button
        type="submit"
        className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 active:scale-95 transition"
      >
        Apply Leave
      </button>
    </form>
  );
}

export default LeaveForm;