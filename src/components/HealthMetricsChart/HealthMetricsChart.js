// src/components/HealthMetricsChart/HealthMetricsChart.jsx
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const HealthMetricsChart = ({ data, metricType, onMetricChange }) => (
  <div className="bg-white p-4 rounded-lg shadow lg:col-span-2">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-lg font-semibold">Health Metrics Trend</h2>
      <div className="flex gap-2">
        <button
          onClick={() => onMetricChange("bloodSugar")}
          className={`px-3 py-1 rounded-lg ${
            metricType === "bloodSugar"
              ? "bg-blue-500 text-white"
              : "bg-gray-100"
          }`}
        >
          Blood Sugar
        </button>
        <button
          onClick={() => onMetricChange("bloodPressure")}
          className={`px-3 py-1 rounded-lg ${
            metricType === "bloodPressure"
              ? "bg-blue-500 text-white"
              : "bg-gray-100"
          }`}
        >
          Blood Pressure
        </button>
      </div>
    </div>
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        {metricType === "bloodSugar" ? (
          <LineChart data={data.bloodSugar}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#3b82f6"
              name="Blood Sugar"
            />
          </LineChart>
        ) : (
          <LineChart data={data.bloodPressure}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="systolic"
              stroke="#3b82f6"
              name="Systolic"
            />
            <Line
              type="monotone"
              dataKey="diastolic"
              stroke="#ef4444"
              name="Diastolic"
            />
          </LineChart>
        )}
      </ResponsiveContainer>
    </div>
  </div>
);

export default HealthMetricsChart;
