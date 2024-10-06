// src/components/HealthDashboard.jsx
import React, { useState } from "react";
import { Bell, Activity, Plus, Pill, Heart } from "lucide-react";
import DashboardHeader from "./DashboardHeader/DashboardHeader";
import SummaryCard from "./SummaryCard/SummaryCard";
import HealthMetricsChart from "./HealthMetricsChart/HealthMetricsChart";
import RemindersList from "./RemindersList/RemindersList";
import AddDataDialog from "./AddDataDialog/AddDataDialog";
import DashboardActions from "./DashboardActions/DashboardActions";
import useHealthData from "../hooks/useHealthData";

const HealthDashboard = () => {
  const { mockData, addMetric, addMedication, addCondition, addReminder } =
    useHealthData();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState("metric"); // 'metric', 'medication', 'condition', 'reminder'
  const [activeChartMetric, setActiveChartMetric] = useState("bloodSugar");
  const [newData, setNewData] = useState({
    metricType: "bloodSugar",
    bloodSugarValue: "",
    systolic: "",
    diastolic: "",
    medicationName: "",
    medicationDosage: "",
    medicationFrequency: "",
    conditionName: "",
    diagnosisDate: "",
    reminderTitle: "",
    reminderTime: "",
    reminderType: "medication",
  });

  const handleAddData = () => {
    switch (dialogType) {
      case "metric":
        if (newData.metricType === "bloodSugar" && newData.bloodSugarValue) {
          const newEntry = {
            date: new Date().toISOString().split("T")[0],
            value: parseInt(newData.bloodSugarValue, 10),
          };
          addMetric("bloodSugar", newEntry);
        } else if (
          newData.metricType === "bloodPressure" &&
          newData.systolic &&
          newData.diastolic
        ) {
          const newEntry = {
            date: new Date().toISOString().split("T")[0],
            systolic: parseInt(newData.systolic, 10),
            diastolic: parseInt(newData.diastolic, 10),
          };
          addMetric("bloodPressure", newEntry);
        }
        break;
      case "medication":
        if (newData.medicationName) {
          const newMedication = {
            medicationId: `m${mockData.medications.length + 1}`,
            name: newData.medicationName,
            dosage: newData.medicationDosage,
            frequency: newData.medicationFrequency,
          };
          addMedication(newMedication);
        }
        break;
      case "condition":
        if (newData.conditionName) {
          const newCondition = {
            conditionId: `c${mockData.healthConditions.length + 1}`,
            conditionName: newData.conditionName,
            diagnosisDate: newData.diagnosisDate,
          };
          addCondition(newCondition);
        }
        break;
      case "reminder":
        if (newData.reminderTitle) {
          const newReminder = {
            reminderId: `r${mockData.reminders.length + 1}`,
            type: newData.reminderType,
            title: newData.reminderTitle,
            scheduledTime: newData.reminderTime,
            isCompleted: false,
          };
          addReminder(newReminder);
        }
        break;
      default:
        break;
    }

    // Reset dialog state
    setIsDialogOpen(false);
    setDialogType("metric");
    setNewData({
      metricType: "bloodSugar",
      bloodSugarValue: "",
      systolic: "",
      diastolic: "",
      medicationName: "",
      medicationDosage: "",
      medicationFrequency: "",
      conditionName: "",
      diagnosisDate: "",
      reminderTitle: "",
      reminderTime: "",
      reminderType: "medication",
    });
  };

  const handleActionClick = (type) => {
    setDialogType(type);
    setIsDialogOpen(true);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <DashboardHeader
        firstName={mockData.user.firstName}
        lastName={mockData.user.lastName}
      />

      {/* Action Buttons */}
      <DashboardActions onActionClick={handleActionClick} />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <SummaryCard
          title="Blood Sugar"
          value={`${
            mockData.healthMetrics.bloodSugar[
              mockData.healthMetrics.bloodSugar.length - 1
            ].value
          } mg/dL`}
          Icon={Activity}
          subtitle="Last reading"
        />
        <SummaryCard
          title="Blood Pressure"
          value={`${
            mockData.healthMetrics.bloodPressure[
              mockData.healthMetrics.bloodPressure.length - 1
            ].systolic
          }/${
            mockData.healthMetrics.bloodPressure[
              mockData.healthMetrics.bloodPressure.length - 1
            ].diastolic
          }`}
          Icon={Heart}
          subtitle="Last reading"
        />
        <SummaryCard
          title="Medications"
          value={mockData.medications.length}
          Icon={Pill}
          subtitle="Active medications"
        />
        <SummaryCard
          title="Reminders"
          value={mockData.reminders.filter((r) => !r.isCompleted).length}
          Icon={Bell}
          subtitle="Pending today"
        />
      </div>

      {/* Charts and Reminders */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <HealthMetricsChart
          data={mockData.healthMetrics}
          metricType={activeChartMetric}
          onMetricChange={setActiveChartMetric}
        />
        <RemindersList reminders={mockData.reminders} />
      </div>

      {/* Add Data Dialog */}
      {isDialogOpen && (
        <AddDataDialog
          dialogType={dialogType}
          newData={newData}
          setNewData={setNewData}
          handleAddData={handleAddData}
          setIsDialogOpen={setIsDialogOpen}
        />
      )}
    </div>
  );
};

export default HealthDashboard;
