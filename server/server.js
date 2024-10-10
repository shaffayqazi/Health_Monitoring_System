
// const express = require("express");
// const usersRoutes = require("./routes/users");
// const conditionsRoutes = require("./routes/conditions");
// const medicationsRoutes = require("./routes/medications");
// const metricsRoutes = require("./routes/metrics");
// const remindersRoutes = require("./routes/reminders");
// const cors = require("cors");

// const app = express();
// const PORT = 5000;
// app.use(cors());
// app.use(express.json()); // Middleware to parse JSON request body

// // Routes
// app.use("/api/users", usersRoutes);
// app.use("/api/conditions", conditionsRoutes);
// app.use("/api/medications", medicationsRoutes);
// app.use("/api/metrics", metricsRoutes);
// app.use("/api/reminders", remindersRoutes);

// // Start server
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });


// app.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse JSON bodies

// Import route modules
const usersRouter = require('./routes/users');
const conditionsRouter = require('./routes/conditions');
const medicationsRouter = require('./routes/medications');
const metricsRouter = require('./routes/metrics');
const remindersRouter = require('./routes/reminders');

// Routes
app.use('/api', usersRouter);
app.use('/api', conditionsRouter);
app.use('/api', medicationsRouter);
app.use('/api', metricsRouter);
app.use('/api', remindersRouter);

// Root endpoint
app.get('/', (req, res) => {
  res.send('Health Tracker Backend API');
});

// 404 Handler
app.use((req, res, next) => {
  res.status(404).json({ error: "Endpoint not found" });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err);
  res.status(500).json({ error: "An unexpected error occurred" });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
