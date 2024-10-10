// src/components/RemindersList/RemindersList.jsx
import React from "react";
import { Bell } from "lucide-react";

const RemindersList = ({ reminders }) => (
  <div className="bg-white p-4 rounded-lg shadow">
    <h2 className="text-lg font-semibold mb-4">Today's Reminders</h2>
    <div className="space-y-4">
      {reminders.map((reminder) => (
        <div
          key={reminder.reminderId}
          className="flex justify-between items-center"
        >
          <div>
            <p className="font-medium">{reminder.title}</p>
            <p className="text-sm text-gray-500">{reminder.scheduledTime}</p>
          </div>
          <Bell className="h-4 w-4 text-gray-400" />
        </div>
      ))}
    </div>
  </div>
);

export default RemindersList;
