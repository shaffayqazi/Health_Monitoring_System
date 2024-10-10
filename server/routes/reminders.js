// // routes/reminders.js
// const express = require("express");
// const { v4: uuidv4 } = require("uuid");
// const pool = require("../services/db.js");
// const router = express.Router();

// // Add a new reminder
// router.post("/", async (req, res) => {
//   const { userId, type, title, description, scheduledTime, recurrencePattern } =
//     req.body;
//   const reminderId = uuidv4();

//   try {
//     const query = `
//       INSERT INTO reminders (reminder_id, user_id, type, title, description, scheduled_time, recurrence_pattern)
//       VALUES (?, ?, ?, ?, ?, ?, ?)
//     `;
//     const values = [
//       reminderId,
//       userId,
//       type,
//       title,
//       description,
//       scheduledTime,
//       recurrencePattern,
//     ];
//     await pool.execute(query, values);
//     res
//       .status(201)
//       .json({ reminderId, message: "Reminder added successfully" });
//   } catch (error) {
//     res.status(500).json({ error: "Error adding reminder: " + error.message });
//   }
// });

// // Get all reminders for a user
// router.get("/user/:userId", async (req, res) => {
//   const userId = req.params.userId;

//   try {
//     const [rows] = await pool.execute(
//       `SELECT * FROM reminders WHERE user_id = ?`,
//       [userId]
//     );
//     res.status(200).json(rows);
//   } catch (error) {
//     res
//       .status(500)
//       .json({ error: "Error fetching reminders: " + error.message });
//   }
// });

// // Mark reminder as completed
// router.put("/:id/complete", async (req, res) => {
//   const reminderId = req.params.id;

//   try {
//     await pool.execute(
//       `UPDATE reminders SET is_completed = 1 WHERE reminder_id = ?`,
//       [reminderId]
//     );
//     res.status(200).json({ message: "Reminder marked as completed" });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ error: "Error marking reminder as completed: " + error.message });
//   }
// });

// // Delete a reminder
// router.delete("/:id", async (req, res) => {
//   const reminderId = req.params.id;

//   try {
//     await pool.execute(`DELETE FROM reminders WHERE reminder_id = ?`, [
//       reminderId,
//     ]);
//     res.status(200).json({ message: "Reminder deleted successfully" });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ error: "Error deleting reminder: " + error.message });
//   }
// });

// module.exports = router;



// routes/reminders.js
const express = require('express');
const router = express.Router();
const pool = require('../services/db.js');
const { v4: uuidv4 } = require('uuid');

// Create a new reminder
router.post('/reminders', async (req, res) => {
  const { user_id, type, title, description, scheduled_time, recurrence_pattern } = req.body;
  const reminderId = uuidv4();

  try {
    const query = `
      INSERT INTO reminders (reminder_id, user_id, type, title, description, scheduled_time, recurrence_pattern)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [reminderId, user_id, type, title, description, scheduled_time, recurrence_pattern];
    await pool.execute(query, values);
    res.status(201).json({ reminderId, message: "Reminder added successfully" });
  } catch (error) {
    console.error("Error adding reminder:", error);
    res.status(500).json({ error: "Error adding reminder: " + error.message });
  }
});

// Get all reminders for a user
router.get('/users/:userId/reminders', async (req, res) => {
  const userId = req.params.userId;

  try {
    const [rows] = await pool.execute('SELECT * FROM reminders WHERE user_id = ?', [userId]);
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching reminders:", error);
    res.status(500).json({ error: "Error fetching reminders: " + error.message });
  }
});

// Get a single reminder by ID
router.get('/reminders/:id', async (req, res) => {
  const reminderId = req.params.id;

  try {
    const [rows] = await pool.execute('SELECT * FROM reminders WHERE reminder_id = ?', [reminderId]);
    if (rows.length === 0) {
      return res.status(404).json({ error: "Reminder not found" });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error("Error fetching reminder:", error);
    res.status(500).json({ error: "Error fetching reminder: " + error.message });
  }
});

// Update a reminder by ID
router.put('/reminders/:id', async (req, res) => {
  const reminderId = req.params.id;
  const { type, title, description, scheduled_time, recurrence_pattern, is_completed } = req.body;

  try {
    const query = `
      UPDATE reminders
      SET type = ?, title = ?, description = ?, scheduled_time = ?, recurrence_pattern = ?, is_completed = ?
      WHERE reminder_id = ?
    `;
    const values = [type, title, description, scheduled_time, recurrence_pattern, is_completed, reminderId];
    const [result] = await pool.execute(query, values);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Reminder not found or no changes made" });
    }

    res.status(200).json({ message: "Reminder updated successfully" });
  } catch (error) {
    console.error("Error updating reminder:", error);
    res.status(500).json({ error: "Error updating reminder: " + error.message });
  }
});

// Delete a reminder by ID
router.delete('/reminders/:id', async (req, res) => {
  const reminderId = req.params.id;

  try {
    const [result] = await pool.execute('DELETE FROM reminders WHERE reminder_id = ?', [reminderId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Reminder not found" });
    }

    res.status(200).json({ message: "Reminder deleted successfully" });
  } catch (error) {
    console.error("Error deleting reminder:", error);
    res.status(500).json({ error: "Error deleting reminder: " + error.message });
  }
});

module.exports = router;
