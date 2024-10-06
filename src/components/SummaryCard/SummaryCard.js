// src/components/SummaryCard/SummaryCard.jsx
import React from "react";

const SummaryCard = ({ title, value, Icon, subtitle }) => (
  <div className="bg-white p-4 rounded-lg shadow">
    <div className="flex justify-between items-center mb-2">
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      {Icon && <Icon className="h-4 w-4 text-gray-400" />}
    </div>
    <div className="text-2xl font-bold">{value}</div>
    <p className="text-xs text-gray-500">{subtitle}</p>
  </div>
);

export default SummaryCard;
