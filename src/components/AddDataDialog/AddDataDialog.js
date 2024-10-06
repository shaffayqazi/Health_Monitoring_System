// src/components/AddDataDialog/AddDataDialog.jsx
import React from "react";
import { X } from "lucide-react";

const AddDataDialog = ({
  dialogType,
  newData,
  setNewData,
  handleAddData,
  setIsDialogOpen,
}) => {
  const renderFormFields = () => {
    switch (dialogType) {
      case "metric":
        return (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Metric Type
              </label>
              <select
                value={newData.metricType}
                onChange={(e) =>
                  setNewData({ ...newData, metricType: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="bloodSugar">Blood Sugar</option>
                <option value="bloodPressure">Blood Pressure</option>
              </select>
            </div>

            {newData.metricType === "bloodSugar" ? (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Blood Sugar Value (mg/dL)
                </label>
                <input
                  type="number"
                  value={newData.bloodSugarValue}
                  onChange={(e) =>
                    setNewData({ ...newData, bloodSugarValue: e.target.value })
                  }
                  placeholder="Enter blood sugar value"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
            ) : (
              <>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Systolic Pressure (mm Hg)
                  </label>
                  <input
                    type="number"
                    value={newData.systolic}
                    onChange={(e) =>
                      setNewData({ ...newData, systolic: e.target.value })
                    }
                    placeholder="Enter systolic value"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Diastolic Pressure (mm Hg)
                  </label>
                  <input
                    type="number"
                    value={newData.diastolic}
                    onChange={(e) =>
                      setNewData({ ...newData, diastolic: e.target.value })
                    }
                    placeholder="Enter diastolic value"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
              </>
            )}
          </>
        );
      case "medication":
        return (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Medication Name
              </label>
              <input
                type="text"
                value={newData.medicationName}
                onChange={(e) =>
                  setNewData({ ...newData, medicationName: e.target.value })
                }
                placeholder="Enter medication name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Dosage
              </label>
              <input
                type="text"
                value={newData.medicationDosage}
                onChange={(e) =>
                  setNewData({ ...newData, medicationDosage: e.target.value })
                }
                placeholder="Enter dosage (e.g., 500mg)"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Frequency
              </label>
              <input
                type="text"
                value={newData.medicationFrequency}
                onChange={(e) =>
                  setNewData({
                    ...newData,
                    medicationFrequency: e.target.value,
                  })
                }
                placeholder="Enter frequency (e.g., Twice daily)"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </>
        );
      case "condition":
        return (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Condition Name
              </label>
              <input
                type="text"
                value={newData.conditionName}
                onChange={(e) =>
                  setNewData({ ...newData, conditionName: e.target.value })
                }
                placeholder="Enter condition name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Diagnosis Date
              </label>
              <input
                type="date"
                value={newData.diagnosisDate}
                onChange={(e) =>
                  setNewData({ ...newData, diagnosisDate: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </>
        );
      case "reminder":
        return (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Reminder Type
              </label>
              <select
                value={newData.reminderType}
                onChange={(e) =>
                  setNewData({ ...newData, reminderType: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="medication">Medication</option>
                <option value="appointment">Appointment</option>
                <option value="measurement">Measurement</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Reminder Title
              </label>
              <input
                type="text"
                value={newData.reminderTitle}
                onChange={(e) =>
                  setNewData({ ...newData, reminderTitle: e.target.value })
                }
                placeholder="Enter reminder title"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Time
              </label>
              <input
                type="time"
                value={newData.reminderTime}
                onChange={(e) =>
                  setNewData({ ...newData, reminderTime: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </>
        );
      default:
        return null;
    }
  };

  const getDialogTitle = () => {
    switch (dialogType) {
      case "metric":
        return "Log Health Metric";
      case "medication":
        return "Add Medication";
      case "condition":
        return "Add Health Condition";
      case "reminder":
        return "Set Reminder";
      default:
        return "";
    }
  };

  const getSubmitButtonText = () => {
    switch (dialogType) {
      case "metric":
        return "Add Reading";
      case "medication":
        return "Add Medication";
      case "condition":
        return "Add Condition";
      case "reminder":
        return "Set Reminder";
      default:
        return "Submit";
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">{getDialogTitle()}</h2>
          <button
            onClick={() => setIsDialogOpen(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>

        {renderFormFields()}

        <div className="flex justify-end gap-4">
          <button
            onClick={() => setIsDialogOpen(false)}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={handleAddData}
            className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
          >
            {getSubmitButtonText()}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddDataDialog;
