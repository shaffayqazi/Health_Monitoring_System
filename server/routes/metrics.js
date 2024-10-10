// // routes/metrics.js
// const express = require("express");
// const { v4: uuidv4 } = require("uuid");
// const pool = require("../services/db");
// const router = express.Router();

// // Add new health metrics (e.g., blood pressure or blood sugar)
// router.post("/", async (req, res) => {
//   const { userId, metricType, value } = req.body;
//   const metricId = uuidv4();

//   try {
//     const query = `
//       INSERT INTO health_metrics (metric_id, user_id, metric_type, value)
//       VALUES (?, ?, ?, ?)
//     `;
//     const values = [metricId, userId, metricType, JSON.stringify(value)];
//     await pool.execute(query, values);
//     res.status(201).json({ metricId, message: "Metric added successfully" });
//   } catch (error) {
//     res.status(500).json({ error: "Error adding metric: " + error.message });
//   }
// });

// // Get all health metrics for a user
// router.get("/user/:userId", async (req, res) => {
//   const userId = req.params.userId;

//   try {
//     const [rows] = await pool.execute(
//       `SELECT * FROM health_metrics WHERE user_id = ?`,
//       [userId]
//     );
//     res.status(200).json(rows);
//   } catch (error) {
//     res.status(500).json({ error: "Error fetching metrics: " + error.message });
//   }
// });

// // Update a health metric
// router.put("/:id", async (req, res) => {
//   const metricId = req.params.id;
//   const { metricType, value } = req.body;

//   try {
//     const query = `
//       UPDATE health_metrics
//       SET metric_type = ?, value = ?
//       WHERE metric_id = ?
//     `;
//     const values = [metricType, JSON.stringify(value), metricId];
//     await pool.execute(query, values);
//     res.status(200).json({ message: "Metric updated successfully" });
//   } catch (error) {
//     res.status(500).json({ error: "Error updating metric: " + error.message });
//   }
// });

// // Delete a health metric
// router.delete("/:id", async (req, res) => {
//   const metricId = req.params.id;

//   try {
//     await pool.execute(`DELETE FROM health_metrics WHERE metric_id = ?`, [
//       metricId,
//     ]);
//     res.status(200).json({ message: "Metric deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ error: "Error deleting metric: " + error.message });
//   }
// });

// module.exports = router;


// routes/metrics.js
const express = require("express");
const router = express.Router();
const pool = require("../services/db.js");
const { v4: uuidv4 } = require("uuid");

// Create a new health metric
const generateMetricId = async (metricType) => {
  let prefix;
  if (metricType === "Blood Sugar") {
    prefix = "bs";
  } else if (metricType === "Blood Pressure") {
    prefix = "bp";
  } else {
    throw new Error("Invalid metric type");
  }

  // Query to find the maximum existing metric_id for the given type
  const query = `
    SELECT metric_id FROM health_metrics
    WHERE metric_type = ?
    ORDER BY metric_id DESC
    LIMIT 1
  `;

  const [rows] = await pool.execute(query, [metricType]);

  let nextIdNumber = 1; // Default if no existing metrics

  if (rows.length > 0) {
    const lastId = rows[0].metric_id; // e.g., 'bs5'
    const lastNumber = parseInt(lastId.slice(prefix.length), 10);
    if (!isNaN(lastNumber)) {
      nextIdNumber = lastNumber + 1;
    }
  }

  return `${prefix}${nextIdNumber}`;
};

// Create a new health metric
router.post("/metrics", async (req, res) => {
  const { user_id, metric_type, date, value, systolic, diastolic } = req.body;

  try {
    // Generate the metric_id based on metric_type
    const metricId = await generateMetricId(metric_type);

    let query, values;

    if (metric_type === "Blood Sugar") {
      query = `
        INSERT INTO health_metrics (metric_id, user_id, metric_type, date, value)
        VALUES (?, ?, ?, ?, ?)
      `;
      values = [metricId, user_id, metric_type, date, value];
    } else if (metric_type === "Blood Pressure") {
      query = `
        INSERT INTO health_metrics (metric_id, user_id, metric_type, date, systolic, diastolic)
        VALUES (?, ?, ?, ?, ?, ?)
      `;
      values = [metricId, user_id, metric_type, date, systolic, diastolic];
    } else {
      return res.status(400).json({ error: "Invalid metric type" });
    }

    await pool.execute(query, values);
    res
      .status(201)
      .json({ metricId, message: "Health metric added successfully" });
  } catch (error) {
    console.error("Error adding health metric:", error);
    res
      .status(500)
      .json({ error: "Error adding health metric: " + error.message });
  }
});



// Get all health metrics for a user
router.get("/users/:userId/metrics", async (req, res) => {
  const userId = req.params.userId;

  try {
    const [rows] = await pool.execute(
      "SELECT * FROM health_metrics WHERE user_id = ?",
      [userId]
    );
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching health metrics:", error);
    res
      .status(500)
      .json({ error: "Error fetching health metrics: " + error.message });
  }
});

// Get a single health metric by ID
router.get("/metrics/:id", async (req, res) => {
  const metricId = req.params.id;

  try {
    const [rows] = await pool.execute(
      "SELECT * FROM health_metrics WHERE metric_id = ?",
      [metricId]
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: "Health metric not found" });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error("Error fetching health metric:", error);
    res
      .status(500)
      .json({ error: "Error fetching health metric: " + error.message });
  }
});

// Update a health metric by ID
router.put("/metrics/:id", async (req, res) => {
  const metricId = req.params.id;
  const { metric_type, date, value, systolic, diastolic } = req.body;

  try {
    let query, values;

    if (metric_type === "Blood Sugar") {
      query = `
        UPDATE health_metrics
        SET metric_type = ?, date = ?, value = ?
        WHERE metric_id = ?
      `;
      values = [metric_type, date, value, metricId];
    } else if (metric_type === "Blood Pressure") {
      query = `
        UPDATE health_metrics
        SET metric_type = ?, date = ?, systolic = ?, diastolic = ?
        WHERE metric_id = ?
      `;
      values = [metric_type, date, systolic, diastolic, metricId];
    } else {
      return res.status(400).json({ error: "Invalid metric type" });
    }

    const [result] = await pool.execute(query, values);

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ error: "Health metric not found or no changes made" });
    }

    res.status(200).json({ message: "Health metric updated successfully" });
  } catch (error) {
    console.error("Error updating health metric:", error);
    res
      .status(500)
      .json({ error: "Error updating health metric: " + error.message });
  }
});

// Delete a health metric by ID
router.delete("/metrics/:id", async (req, res) => {
  const metricId = req.params.id;

  try {
    const [result] = await pool.execute(
      "DELETE FROM health_metrics WHERE metric_id = ?",
      [metricId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Health metric not found" });
    }

    res.status(200).json({ message: "Health metric deleted successfully" });
  } catch (error) {
    console.error("Error deleting health metric:", error);
    res
      .status(500)
      .json({ error: "Error deleting health metric: " + error.message });
  }
});

module.exports = router;
