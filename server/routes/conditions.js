// // routes/conditions.js
// const express = require("express");
// const { v4: uuidv4 } = require("uuid");
// const pool = require("../services/db");
// const router = express.Router();

// // Add a new health condition
// router.post("/", async (req, res) => {
//   const { userId, conditionName, diagnosisDate, notes } = req.body;
//   const conditionId = uuidv4();

//   try {
//     const query = `
//       INSERT INTO health_conditions (condition_id, user_id, condition_name, diagnosis_date, notes)
//       VALUES (?, ?, ?, ?, ?)
//     `;
//     const values = [conditionId, userId, conditionName, diagnosisDate, notes];
//     await pool.execute(query, values);
//     res
//       .status(201)
//       .json({ conditionId, message: "Condition added successfully" });
//   } catch (error) {
//     res.status(500).json({ error: "Error adding condition: " + error.message });
//   }
// });

// // Get all conditions for a user
// router.get("/user/:userId", async (req, res) => {
//   const userId = req.params.userId;

//   try {
//     const [rows] = await pool.execute(
//       `SELECT * FROM health_conditions WHERE user_id = ?`,
//       [userId]
//     );
//     res.status(200).json(rows);
//   } catch (error) {
//     res
//       .status(500)
//       .json({ error: "Error fetching conditions: " + error.message });
//   }
// });

// module.exports = router;



// routes/conditions.js
const express = require("express");
const router = express.Router();
const pool = require("../services/db.js");
const { v4: uuidv4 } = require("uuid");

// Create a new health condition
router.post("/conditions", async (req, res) => {
  const { user_id, condition_name, diagnosis_date, notes } = req.body;
  const conditionId = uuidv4();

  try {
    const query = `
      INSERT INTO health_conditions (condition_id, user_id, condition_name, diagnosis_date, notes)
      VALUES (?, ?, ?, ?, ?)
    `;
    const values = [
      conditionId,
      user_id,
      condition_name,
      diagnosis_date,
      notes,
    ];
    await pool.execute(query, values);
    res
      .status(201)
      .json({ conditionId, message: "Health condition added successfully" });
  } catch (error) {
    console.error("Error adding health condition:", error);
    res
      .status(500)
      .json({ error: "Error adding health condition: " + error.message });
  }
});

// Get all health conditions for a user
router.get("/users/:userId/conditions", async (req, res) => {
  const userId = req.params.userId;

  try {
    const [rows] = await pool.execute(
      "SELECT * FROM health_conditions WHERE user_id = ?",
      [userId]
    );
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching health conditions:", error);
    res
      .status(500)
      .json({ error: "Error fetching health conditions: " + error.message });
  }
});

// Get a single health condition by ID
router.get("/conditions/:id", async (req, res) => {
  const conditionId = req.params.id;

  try {
    const [rows] = await pool.execute(
      "SELECT * FROM health_conditions WHERE condition_id = ?",
      [conditionId]
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: "Health condition not found" });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error("Error fetching health condition:", error);
    res
      .status(500)
      .json({ error: "Error fetching health condition: " + error.message });
  }
});

// Update a health condition by ID
router.put("/conditions/:id", async (req, res) => {
  const conditionId = req.params.id;
  const { condition_name, diagnosis_date, notes } = req.body;

  try {
    const query = `
      UPDATE health_conditions
      SET condition_name = ?, diagnosis_date = ?, notes = ?
      WHERE condition_id = ?
    `;
    const values = [condition_name, diagnosis_date, notes, conditionId];
    const [result] = await pool.execute(query, values);

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ error: "Health condition not found or no changes made" });
    }

    res.status(200).json({ message: "Health condition updated successfully" });
  } catch (error) {
    console.error("Error updating health condition:", error);
    res
      .status(500)
      .json({ error: "Error updating health condition: " + error.message });
  }
});

// Delete a health condition by ID
router.delete("/conditions/:id", async (req, res) => {
  const conditionId = req.params.id;

  try {
    const [result] = await pool.execute(
      "DELETE FROM health_conditions WHERE condition_id = ?",
      [conditionId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Health condition not found" });
    }

    res.status(200).json({ message: "Health condition deleted successfully" });
  } catch (error) {
    console.error("Error deleting health condition:", error);
    res
      .status(500)
      .json({ error: "Error deleting health condition: " + error.message });
  }
});

module.exports = router;
