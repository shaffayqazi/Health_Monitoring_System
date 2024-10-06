// src/components/DashboardActions/DashboardActions.jsx
import React from "react";
import { Bell, Pill, Plus } from "lucide-react";

const DashboardActions = ({ onActionClick }) => (
  <div className="flex gap-2 mb-6">
    <button
      onClick={() => onActionClick("metric")}
      className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg"
    >
      <Plus size={20} />
      Log Metric
    </button>
    <button
      onClick={() => onActionClick("medication")}
      className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg"
    >
      <Pill size={20} />
      Add Medication
    </button>
    <button
      onClick={() => onActionClick("reminder")}
      className="flex items-center gap-2 bg-purple-500 text-white px-4 py-2 rounded-lg"
    >
      <Bell size={20} />
      Set Reminder
    </button>
  </div>
);

export default DashboardActions;
