// // routes/medications.js
// const express = require("express");
// const { v4: uuidv4 } = require("uuid");
// const pool = require("../services/db");
// const router = express.Router();

// // Add a new medication
// router.post("/", async (req, res) => {
//   const { userId, name, dosage, frequency, startDate, endDate } = req.body;
//   const medicationId = uuidv4();

//   try {
//     const query = `
//       INSERT INTO medications (medication_id, user_id, name, dosage, frequency, start_date, end_date)
//       VALUES (?, ?, ?, ?, ?, ?, ?)
//     `;
//     const values = [
//       medicationId,
//       userId,
//       name,
//       dosage,
//       frequency,
//       startDate,
//       endDate,
//     ];
//     await pool.execute(query, values);
//     res
//       .status(201)
//       .json({ medicationId, message: "Medication added successfully" });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ error: "Error adding medication: " + error.message });
//   }
// });

// // Get all medications for a user
// router.get("/user/:userId", async (req, res) => {
//   const userId = req.params.userId;

//   try {
//     const [rows] = await pool.execute(
//       `SELECT * FROM medications WHERE user_id = ?`,
//       [userId]
//     );
//     res.status(200).json(rows);
//   } catch (error) {
//     res
//       .status(500)
//       .json({ error: "Error fetching medications: " + error.message });
//   }
// });

// // Update a medication
// router.put("/:id", async (req, res) => {
//   const medicationId = req.params.id;
//   const { name, dosage, frequency, startDate, endDate } = req.body;

//   try {
//     const query = `
//       UPDATE medications
//       SET name = ?, dosage = ?, frequency = ?, start_date = ?, end_date = ?
//       WHERE medication_id = ?
//     `;
//     const values = [name, dosage, frequency, startDate, endDate, medicationId];
//     await pool.execute(query, values);
//     res.status(200).json({ message: "Medication updated successfully" });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ error: "Error updating medication: " + error.message });
//   }
// });

// // Delete a medication
// router.delete("/:id", async (req, res) => {
//   const medicationId = req.params.id;

//   try {
//     await pool.execute(`DELETE FROM medications WHERE medication_id = ?`, [
//       medicationId,
//     ]);
//     res.status(200).json({ message: "Medication deleted successfully" });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ error: "Error deleting medication: " + error.message });
//   }
// });

// module.exports = router;


// routes/medications.js
const express = require("express");
const router = express.Router();
const pool = require("../services/db.js");
const { v4: uuidv4 } = require("uuid");

// Create a new medication
router.post("/medications", async (req, res) => {
  const { user_id, name, dosage, frequency, start_date, end_date } = req.body;
  const medicationId = uuidv4();

  try {
    const query = `
      INSERT INTO medications (medication_id, user_id, name, dosage, frequency, start_date, end_date)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      medicationId,
      user_id,
      name,
      dosage,
      frequency,
      start_date,
      end_date,
    ];
    await pool.execute(query, values);
    res
      .status(201)
      .json({ medicationId, message: "Medication added successfully" });
  } catch (error) {
    console.error("Error adding medication:", error);
    res
      .status(500)
      .json({ error: "Error adding medication: " + error.message });
  }
});

// Get all medications for a user
router.get("/users/:userId/medications", async (req, res) => {
  const userId = req.params.userId;

  try {
    const [rows] = await pool.execute(
      "SELECT * FROM medications WHERE user_id = ?",
      [userId]
    );
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching medications:", error);
    res
      .status(500)
      .json({ error: "Error fetching medications: " + error.message });
  }
});

// Get a single medication by ID
router.get("/medications/:id", async (req, res) => {
  const medicationId = req.params.id;

  try {
    const [rows] = await pool.execute(
      "SELECT * FROM medications WHERE medication_id = ?",
      [medicationId]
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: "Medication not found" });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error("Error fetching medication:", error);
    res
      .status(500)
      .json({ error: "Error fetching medication: " + error.message });
  }
});

// Update a medication by ID
router.put("/medications/:id", async (req, res) => {
  const medicationId = req.params.id;
  const { name, dosage, frequency, start_date, end_date } = req.body;

  try {
    const query = `
      UPDATE medications
      SET name = ?, dosage = ?, frequency = ?, start_date = ?, end_date = ?
      WHERE medication_id = ?
    `;
    const values = [
      name,
      dosage,
      frequency,
      start_date,
      end_date,
      medicationId,
    ];
    const [result] = await pool.execute(query, values);

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ error: "Medication not found or no changes made" });
    }

    res.status(200).json({ message: "Medication updated successfully" });
  } catch (error) {
    console.error("Error updating medication:", error);
    res
      .status(500)
      .json({ error: "Error updating medication: " + error.message });
  }
});

// Delete a medication by ID
router.delete("/medications/:id", async (req, res) => {
  const medicationId = req.params.id;

  try {
    const [result] = await pool.execute(
      "DELETE FROM medications WHERE medication_id = ?",
      [medicationId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Medication not found" });
    }

    res.status(200).json({ message: "Medication deleted successfully" });
  } catch (error) {
    console.error("Error deleting medication:", error);
    res
      .status(500)
      .json({ error: "Error deleting medication: " + error.message });
  }
});

module.exports = router;
