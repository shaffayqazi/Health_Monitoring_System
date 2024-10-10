// // src/components/HealthDashboard.jsx
// import React, { useState, useEffect } from "react";
// import { Bell, Activity, Plus, Pill, Heart } from "lucide-react";
// import DashboardHeader from "./DashboardHeader/DashboardHeader.js";
// import SummaryCard from "./SummaryCard/SummaryCard.js";
// import HealthMetricsChart from "./HealthMetricsChart/HealthMetricsChart.js";
// import RemindersList from "./RemindersList/RemindersList.js";
// import AddDataDialog from "./AddDataDialog/AddDataDialog.js";
// import DashboardActions from "./DashboardActions/DashboardActions.js";
// import useHealthData from "../hooks/useHealthData.js";
// import {
//   getUser,
//   getConditions,
//   getMedications,
//   getMetrics,
//   getReminders,
// } from "../services/apis.js";

// const HealthDashboard = () => {
//   const { mockData, addMetric, addMedication, addCondition, addReminder } =
//     useHealthData();
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [dialogType, setDialogType] = useState("metric"); // 'metric', 'medication', 'condition', 'reminder'
//   const [activeChartMetric, setActiveChartMetric] = useState("bloodSugar");
//   const [loading, setLoading] = useState(true);
//   const [userData, setUserData] = useState();
//   const [reminders, setReminders] = useState([]);
//   const [conditions, setConditions] = useState([]);
//   const [medications, setMedications] = useState([]);
//   const [metrics, setMetrics] = useState({ bloodSugar: [], bloodPressure: [] });

//   const [newData, setNewData] = useState({
//     metricType: "bloodSugar",
//     bloodSugarValue: "",
//     systolic: "",
//     diastolic: "",
//     medicationName: "",
//     medicationDosage: "",
//     medicationFrequency: "",
//     conditionName: "",
//     diagnosisDate: "",
//     reminderTitle: "",
//     reminderTime: "",
//     reminderType: "medication",
//   });

//   useEffect(() => {
//     const userId = "12345";

//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         const user = await getUser(userId);
//         const userConditions = await getConditions(userId);
//         const userMedications = await getMedications(userId);
//         const userMetrics = await getMetrics(userId);
//         const userReminders = await getReminders(userId);
//         console.log(user.first_name);

//         setUserData(user);
//         setConditions(userConditions);
//         setMedications(userMedications);
//         setMetrics(userMetrics);
//         setReminders(userReminders);
//         setLoading(false);
        
//       } catch (error) {
//         console.error("Error loading data", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   useEffect(() => {
//     if (userData) {
//       console.log("User", userData.first_name);
//       console.log("Condition", conditions);
//       console.log("Medication", medications);
//       console.log("Metrics", metrics)
//       console.log("Metrics", metrics);
//       console.log("Reminders", reminders);

//     }
//   }, [userData, conditions, medications, metrics, reminders]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   const handleAddData = () => {
//     switch (dialogType) {
//       case "metric":
//         if (newData.metricType === "bloodSugar" && newData.bloodSugarValue) {
//           const newEntry = {
//             date: new Date().toISOString().split("T")[0],
//             value: parseInt(newData.bloodSugarValue, 10),
//           };
//           addMetric("bloodSugar", newEntry);
//         } else if (
//           newData.metricType === "bloodPressure" &&
//           newData.systolic &&
//           newData.diastolic
//         ) {
//           const newEntry = {
//             date: new Date().toISOString().split("T")[0],
//             systolic: parseInt(newData.systolic, 10),
//             diastolic: parseInt(newData.diastolic, 10),
//           };
//           addMetric("bloodPressure", newEntry);
//         }
//         break;
//       case "medication":
//         if (newData.medicationName) {
//           const newMedication = {
//             medicationId: `m${mockData.medications.length + 1}`,
//             name: newData.medicationName,
//             dosage: newData.medicationDosage,
//             frequency: newData.medicationFrequency,
//           };
//           addMedication(newMedication);
//         }
//         break;
//       case "condition":
//         if (newData.conditionName) {
//           const newCondition = {
//             conditionId: `c${mockData.healthConditions.length + 1}`,
//             conditionName: newData.conditionName,
//             diagnosisDate: newData.diagnosisDate,
//           };
//           addCondition(newCondition);
//         }
//         break;
//       case "reminder":
//         if (newData.reminderTitle) {
//           const newReminder = {
//             reminderId: `r${mockData.reminders.length + 1}`,
//             type: newData.reminderType,
//             title: newData.reminderTitle,
//             scheduledTime: newData.reminderTime,
//             isCompleted: false,
//           };
//           addReminder(newReminder);
//         }
//         break;
//       default:
//         break;
//     }

//     // Reset dialog state
//     setIsDialogOpen(false);
//     setDialogType("metric");
//     setNewData({
//       metricType: "bloodSugar",
//       bloodSugarValue: "",
//       systolic: "",
//       diastolic: "",
//       medicationName: "",
//       medicationDosage: "",
//       medicationFrequency: "",
//       conditionName: "",
//       diagnosisDate: "",
//       reminderTitle: "",
//       reminderTime: "",
//       reminderType: "medication",
//     });
//   };

//   const handleActionClick = (type) => {
//     setDialogType(type);
//     setIsDialogOpen(true);
//   };

//   return (
//     <div className="p-6 max-w-7xl mx-auto">
//       {/* Header */}
//       <DashboardHeader
//         firstName={userData.first_name}
//         lastName={userData.last_name}
//       />

//       {/* Action Buttons */}
//       <DashboardActions onActionClick={handleActionClick} />

//       {/* Summary Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
//         <SummaryCard
//           title="Blood Sugar"
//           value={`${120} mg/dL`}
//           Icon={Activity}
//           subtitle="Last reading"
//         />
//         <SummaryCard
//           title="Blood Pressure"
//           value={`${
//             mockData.healthMetrics.bloodPressure[
//               mockData.healthMetrics.bloodPressure.length - 1
//             ].systolic
//           }/${
//             mockData.healthMetrics.bloodPressure[
//               mockData.healthMetrics.bloodPressure.length - 1
//             ].diastolic
//           }`}
//           Icon={Heart}
//           subtitle="Last reading"
//         />
//         <SummaryCard
//           title="Medications"
//           value={mockData.medications.length}
//           Icon={Pill}
//           subtitle="Active medications"
//         />
//         <SummaryCard
//           title="Reminders"
//           value={mockData.reminders.filter((r) => !r.isCompleted).length}
//           Icon={Bell}
//           subtitle="Pending today"
//         />
//       </div>

//       {/* Charts and Reminders */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         <HealthMetricsChart
//           data={mockData.healthMetrics}
//           metricType={activeChartMetric}
//           onMetricChange={setActiveChartMetric}
//         />
//         <RemindersList reminders={mockData.reminders} />
//       </div>

//       {/* Add Data Dialog */}
//       {isDialogOpen && (
//         <AddDataDialog
//           dialogType={dialogType}
//           newData={newData}
//           setNewData={setNewData}
//           handleAddData={handleAddData}
//           setIsDialogOpen={setIsDialogOpen}
//         />
//       )}
//     </div>
//   );
// };

// export default HealthDashboard;



// src/components/HealthDashboard.jsx
import React, { useState, useEffect } from "react";
import { Bell, Activity, Plus, Pill, Heart } from "lucide-react";
import DashboardHeader from "./DashboardHeader/DashboardHeader.js";
import SummaryCard from "./SummaryCard/SummaryCard.js";
import HealthMetricsChart from "./HealthMetricsChart/HealthMetricsChart.js";
import RemindersList from "./RemindersList/RemindersList.js";
import AddDataDialog from "./AddDataDialog/AddDataDialog.js";
import DashboardActions from "./DashboardActions/DashboardActions.js";
import {
  getUser,
  getConditions,
  getMedications,
  getMetrics,
  getReminders,
} from "../services/apis.js";
import axios from "axios";

const HealthDashboard = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState("metric"); // 'metric', 'medication', 'condition', 'reminder'
  const [activeChartMetric, setActiveChartMetric] = useState("bloodSugar");
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState();
  const [reminders, setReminders] = useState([]);
  const [conditions, setConditions] = useState([]);
  const [medications, setMedications] = useState([]);
  const [metrics, setMetrics] = useState({ bloodSugar: [], bloodPressure: [] });

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

  useEffect(() => {
    const userId = "12345";

    const fetchData = async () => {
      try {
        setLoading(true);
        const [user, userConditions, userMedications, userMetrics, userReminders] =
          await Promise.all([
            getUser(userId),
            getConditions(userId),
            getMedications(userId),
            getMetrics(userId),
            getReminders(userId),
          ]);

        setUserData(user);
        setConditions(userConditions);
        setMedications(userMedications);
        // Assuming getMetrics returns an object with bloodSugar and bloodPressure arrays
        setMetrics({
          bloodSugar: userMetrics.filter(metric => metric.metric_type === 'Blood Sugar'),
          bloodPressure: userMetrics.filter(metric => metric.metric_type === 'Blood Pressure'),
        });
        setReminders(userReminders);
      } catch (error) {
        console.error("Error loading data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (userData) {
      console.log("User", userData.first_name);
      console.log("Conditions", conditions);
      console.log("Medications", medications);
      console.log("Metrics", metrics);
      console.log("Reminders", reminders);
    }
  }, [userData, conditions, medications, metrics, reminders]);

  if (loading) {
    return <div>Loading...</div>;
  }

  // const handleAddData = () => {
  //   // Handle adding new data based on dialogType
  //   // This should also involve API calls to persist the new data
  //   // For simplicity, we'll update the state directly here

  //   switch (dialogType) {
  //     case "metric":
  //       if (newData.metricType === "bloodSugar" && newData.bloodSugarValue) {
  //         const newEntry = {
  //           metric_id: `bs${metrics.bloodSugar.length + 1}`,
  //           metric_type: "Blood Sugar",
  //           date: new Date().toISOString().split("T")[0],
  //           value: parseInt(newData.bloodSugarValue, 10),
  //         };
  //         setMetrics(prev => ({
  //           ...prev,
  //           bloodSugar: [...prev.bloodSugar, newEntry],
  //         }));
  //         // Optionally, call an API to save the new metric
  //       } else if (
  //         newData.metricType === "bloodPressure" &&
  //         newData.systolic &&
  //         newData.diastolic
  //       ) {
  //         const newEntry = {
  //           metric_id: `bp${metrics.bloodPressure.length + 1}`,
  //           metric_type: "Blood Pressure",
  //           date: new Date().toISOString().split("T")[0],
  //           systolic: parseInt(newData.systolic, 10),
  //           diastolic: parseInt(newData.diastolic, 10),
  //         };
  //         setMetrics(prev => ({
  //           ...prev,
  //           bloodPressure: [...prev.bloodPressure, newEntry],
  //         }));
  //         // Optionally, call an API to save the new metric
  //       }
  //       break;
  //     case "medication":
  //       if (newData.medicationName) {
  //         const newMedication = {
  //           medication_id: `m${medications.length + 1}`,
  //           name: newData.medicationName,
  //           dosage: newData.medicationDosage,
  //           frequency: newData.medicationFrequency,
  //         };
  //         setMedications(prev => [...prev, newMedication]);
  //         // Optionally, call an API to save the new medication
  //       }
  //       break;
  //     case "condition":
  //       if (newData.conditionName) {
  //         const newCondition = {
  //           condition_id: `c${conditions.length + 1}`,
  //           condition_name: newData.conditionName,
  //           diagnosis_date: newData.diagnosisDate,
  //         };
  //         setConditions(prev => [...prev, newCondition]);
  //         // Optionally, call an API to save the new condition
  //       }
  //       break;
  //     case "reminder":
  //       if (newData.reminderTitle) {
  //         const newReminder = {
  //           reminder_id: `r${reminders.length + 1}`,
  //           type: newData.reminderType,
  //           title: newData.reminderTitle,
  //           scheduled_time: newData.reminderTime,
  //           is_completed: false,
  //         };
  //         setReminders(prev => [...prev, newReminder]);
  //         // Optionally, call an API to save the new reminder
  //       }
  //       break;
  //     default:
  //       break;
  //   }

  //   // Reset dialog state
  //   setIsDialogOpen(false);
  //   setDialogType("metric");
  //   setNewData({
  //     metricType: "bloodSugar",
  //     bloodSugarValue: "",
  //     systolic: "",
  //     diastolic: "",
  //     medicationName: "",
  //     medicationDosage: "",
  //     medicationFrequency: "",
  //     conditionName: "",
  //     diagnosisDate: "",
  //     reminderTitle: "",
  //     reminderTime: "",
  //     reminderType: "medication",
  //   });
  // };

  const handleActionClick = (type) => {
    setDialogType(type);
    setIsDialogOpen(true);
  };




  

  const handleAddData = async () => {
    const userId = "12345"; // This should come from authenticated user data
    try {
      switch (dialogType) {
        case "metric":
          if (newData.metricType === "bloodSugar" && newData.bloodSugarValue) {
            const newEntry = {
              user_id: userId,
              metric_type: "Blood Sugar",
              date: new Date().toISOString().split("T")[0],
              value: parseInt(newData.bloodSugarValue, 10),
            };
            await axios.post("/api/metrics", newEntry); // POST to add metric
            setMetrics((prev) => ({
              ...prev,
              bloodSugar: [...prev.bloodSugar, newEntry],
            }));
          } else if (
            newData.metricType === "bloodPressure" &&
            newData.systolic &&
            newData.diastolic
          ) {
            const newEntry = {
              user_id: userId,
              metric_type: "Blood Pressure",
              date: new Date().toISOString().split("T")[0],
              systolic: parseInt(newData.systolic, 10),
              diastolic: parseInt(newData.diastolic, 10),
            };
            await axios.post("/api/metrics", newEntry); // POST to add blood pressure
            setMetrics((prev) => ({
              ...prev,
              bloodPressure: [...prev.bloodPressure, newEntry],
            }));
          }
          break;

        case "medication":
          if (newData.medicationName) {
            const newMedication = {
              user_id: userId,
              name: newData.medicationName,
              dosage: newData.medicationDosage,
              frequency: newData.medicationFrequency,
            };
            await axios.post("/api/medications", newMedication); // POST to add medication
            setMedications((prev) => [...prev, newMedication]);
          }
          break;

        case "condition":
          if (newData.conditionName) {
            const newCondition = {
              user_id: userId,
              condition_name: newData.conditionName,
              diagnosis_date: newData.diagnosisDate,
            };
            await axios.post("/api/conditions", newCondition); // POST to add condition
            setConditions((prev) => [...prev, newCondition]);
          }
          break;

        case "reminder":
          if (newData.reminderTitle) {
            const newReminder = {
              user_id: userId,
              title: newData.reminderTitle,
              scheduled_time: newData.reminderTime,
              type: newData.reminderType,
              is_completed: false,
            };
            await axios.post("/api/reminders", newReminder); // POST to add reminder
            setReminders((prev) => [...prev, newReminder]);
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
    } catch (error) {
      console.error("Error adding data", error);
    }
  };



  // Extract the latest blood sugar and blood pressure readings
  const latestBloodSugar =
    metrics.bloodSugar.length > 0
      ? metrics.bloodSugar[metrics.bloodSugar.length - 1].value
      : "N/A";
  console.log(latestBloodSugar);

  const latestBloodPressure =
    metrics.bloodPressure.length > 0
      ? `${metrics.bloodPressure[metrics.bloodPressure.length - 1].systolic}/${metrics.bloodPressure[metrics.bloodPressure.length - 1].diastolic}`
      : "N/A";

  // Count active medications and pending reminders
  const activeMedications = medications.length;
  const pendingReminders = reminders.filter(r => !r.is_completed).length;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <DashboardHeader
        firstName={userData.first_name}
        lastName={userData.last_name}
      />

      {/* Action Buttons */}
      <DashboardActions onActionClick={handleActionClick} />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <SummaryCard
          title="Blood Sugar"
          value={`${latestBloodSugar} mg/dL`}
          Icon={Activity}
          subtitle="Last reading"
        />
        <SummaryCard
          title="Blood Pressure"
          value={latestBloodPressure}
          Icon={Heart}
          subtitle="Last reading"
        />
        <SummaryCard
          title="Medications"
          value={activeMedications}
          Icon={Pill}
          subtitle="Active medications"
        />
        <SummaryCard
          title="Reminders"
          value={pendingReminders}
          Icon={Bell}
          subtitle="Pending today"
        />
      </div>

      {/* Charts and Reminders */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <HealthMetricsChart
            data={metrics}
            metricType={activeChartMetric}
            onMetricChange={setActiveChartMetric}
          />
        </div>
        <RemindersList reminders={reminders} />
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
