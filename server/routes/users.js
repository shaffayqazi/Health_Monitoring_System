// // routes/users.js
// const express = require("express");
// const { v4: uuidv4 } = require("uuid");
// const pool = require("../services/db");
// const router = express.Router();

// // Create a new user
// router.post("/", async (req, res) => {
//   const { email, passwordHash, firstName, lastName, dateOfBirth } = req.body;
//   const userId = uuidv4();

//   try {
//     const query = `
//       INSERT INTO users (user_id, email, password_hash, first_name, last_name, date_of_birth)
//       VALUES (?, ?, ?, ?, ?, ?)
//     `;
//     const values = [
//       userId,
//       email,
//       passwordHash,
//       firstName,
//       lastName,
//       dateOfBirth,
//     ];
//     await pool.execute(query, values);
//     res.status(201).json({ userId, message: "User created successfully" });
//   } catch (error) {
//     res.status(500).json({ error: "Error creating user: " + error.message });
//   }
// });

// // Get user by ID
// router.get("/:id", async (req, res) => {
//   const userId = req.params.id;

//   try {
//     const [rows] = await pool.execute(`SELECT * FROM users WHERE user_id = ?`, [
//       userId,
//     ]);
//     if (rows.length > 0) {
//       res.status(200).json(rows[0]);
//     } else {
//       res.status(404).json({ message: "User not found" });
//     }
//   } catch (error) {
//     res.status(500).json({ error: "Error fetching user: " + error.message });
//   }
// });

// // Update user
// router.put("/:id", async (req, res) => {
//   const userId = req.params.id;
//   const { firstName, lastName, dateOfBirth } = req.body;

//   try {
//     const query = `
//       UPDATE users
//       SET first_name = ?, last_name = ?, date_of_birth = ?, updated_at = CURRENT_TIMESTAMP
//       WHERE user_id = ?
//     `;
//     const values = [firstName, lastName, dateOfBirth, userId];
//     await pool.execute(query, values);
//     res.status(200).json({ message: "User updated successfully" });
//   } catch (error) {
//     res.status(500).json({ error: "Error updating user: " + error.message });
//   }
// });

// // Delete user
// router.delete("/:id", async (req, res) => {
//   const userId = req.params.id;

//   try {
//     await pool.execute(`DELETE FROM users WHERE user_id = ?`, [userId]);
//     res.status(200).json({ message: "User deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ error: "Error deleting user: " + error.message });
//   }
// });

// module.exports = router;

// routes/users.js
const express = require("express");
const router = express.Router();
const pool = require("../services/db.js");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const JWT_SECRET = "11H3H4K2N345B5";


// Create a new user
router.post("/users", async (req, res) => {
  const { first_name, last_name, email, password, phone } = req.body;
  const userId = uuidv4();

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = `
      INSERT INTO users (user_id, first_name, last_name, email, password, phone)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const values = [
      userId,
      first_name,
      last_name,
      email,
      hashedPassword,
      phone,
    ];

    await pool.execute(query, values);
    res.status(201).json({ userId, message: "User created successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Error creating user: " + error.message });
  }
});


// Login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Get user from database
    const [users] = await pool.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    if (users.length === 0) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const user = users[0];

    // Check password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Create JWT token
    const token = jwt.sign(
      { userId: user.user_id, email: user.email },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      token,
      user: {
        userId: user.user_id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name
      }
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Error during login" });
  }
});




// Get all users
router.get("/users", async (req, res) => {
  try {
    const [rows] = await pool.execute("SELECT * FROM users");
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Error fetching users: " + error.message });
  }
});

// Get a single user by ID
router.get("/users/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    const [rows] = await pool.execute("SELECT * FROM users WHERE user_id = ?", [
      userId,
    ]);
    if (rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Error fetching user: " + error.message });
  }
});

// Update a user by ID
router.put("/users/:id", async (req, res) => {
  const userId = req.params.id;
  const {
    first_name,
    last_name,
    email,
    date_of_birth,
    avatar,
    age,
    phone,
    emergency_contact,
  } = req.body;

  try {
    const query = `
      UPDATE users
      SET first_name = ?, last_name = ?, email = ?, date_of_birth = ?, avatar = ?, age = ?, phone = ?, emergency_contact = ?
      WHERE user_id = ?
    `;
    const values = [
      first_name,
      last_name,
      email,
      date_of_birth,
      avatar,
      age,
      phone,
      emergency_contact,
      userId,
    ];
    const [result] = await pool.execute(query, values);

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ error: "User not found or no changes made" });
    }

    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Error updating user: " + error.message });
  }
});

// Delete a user by ID
router.delete("/users/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    const [result] = await pool.execute("DELETE FROM users WHERE user_id = ?", [
      userId,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Error deleting user: " + error.message });
  }
});

module.exports = router;
