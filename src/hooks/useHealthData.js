// src/hooks/useHealthData.js
import { useState } from "react";

// Initial mock data
const initialMockData = {
  user: {
    userId: "12345",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    dateOfBirth: "1980-01-01",
    avatar: "/api/placeholder/100/100",
    age: 44,
    phone: "(555) 123-4567",
    emergencyContact: "Jane Doe - (555) 987-6543",
  },
  healthConditions: [
    {
      conditionId: "c1",
      conditionName: "Type 2 Diabetes",
      diagnosisDate: "2022-01-15",
    },
    {
      conditionId: "c2",
      conditionName: "Hypertension",
      diagnosisDate: "2021-06-20",
    },
  ],
  medications: [
    {
      medicationId: "m1",
      name: "Metformin",
      dosage: "500mg",
      frequency: "Twice daily",
    },
    {
      medicationId: "m2",
      name: "Lisinopril",
      dosage: "10mg",
      frequency: "Once daily",
    },
  ],
  healthMetrics: {
    bloodSugar: [
      { date: "2024-03-01", value: 120 },
      { date: "2024-03-02", value: 115 },
      { date: "2024-03-03", value: 125 },
      { date: "2024-03-04", value: 118 },
      { date: "2024-03-05", value: 122 },
    ],
    bloodPressure: [
      { date: "2024-03-01", systolic: 128, diastolic: 82 },
      { date: "2024-03-02", systolic: 126, diastolic: 80 },
      { date: "2024-03-03", systolic: 130, diastolic: 85 },
      { date: "2024-03-04", systolic: 125, diastolic: 79 },
      { date: "2024-03-05", systolic: 127, diastolic: 81 },
    ],
  },
  reminders: [
    {
      reminderId: "r1",
      type: "medication",
      title: "Take Metformin",
      scheduledTime: "10:00",
      isCompleted: false,
    },
    {
      reminderId: "r2",
      type: "appointment",
      title: "Dr. Smith Appointment",
      scheduledTime: "14:30",
      isCompleted: false,
    },
  ],
};

const useHealthData = () => {
  const [mockData, setMockData] = useState(initialMockData);

  const addMetric = (metricType, data) => {
    setMockData((prevData) => {
      const updatedMetrics = {
        ...prevData.healthMetrics,
        [metricType]: [...prevData.healthMetrics[metricType], data],
      };
      return { ...prevData, healthMetrics: updatedMetrics };
    });
  };

  const addMedication = (medication) => {
    setMockData((prevData) => ({
      ...prevData,
      medications: [...prevData.medications, medication],
    }));
  };

  const addCondition = (condition) => {
    setMockData((prevData) => ({
      ...prevData,
      healthConditions: [...prevData.healthConditions, condition],
    }));
  };

  const addReminder = (reminder) => {
    setMockData((prevData) => ({
      ...prevData,
      reminders: [...prevData.reminders, reminder],
    }));
  };

  return {
    mockData,
    addMetric,
    addMedication,
    addCondition,
    addReminder,
  };
};

export default useHealthData;
