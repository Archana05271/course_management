function authorizeRoles(...allowedRoles) {
  return (req, res, next) => {
    // authMiddleware must run before this middleware
    if (!req.user) {
      return res.status(401).json({
        message: "Authentication required"
      });
    }
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Access denied. Insufficient permissions."
      });
    }
    next();
  };
}

module.exports = authorizeRoles;
```[cite: 4]

---

### 2. `backend/scripts/createAdmin.js`
Create this script file to seed your admin user[cite: 4]:

```javascript
require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/User"); // Adjust import to match your user model

async function createAdmin() {
  try {
    const mongoUri = process.env.MONGO_URI;
    const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
    const password = process.env.ADMIN_PASSWORD;

    if (!mongoUri || !email || !password) {
      throw new Error("MONGO_URI, ADMIN_EMAIL and ADMIN_PASSWORD are required");
    }
    if (password.length < 12) {
      throw new Error("Admin password must contain at least 12 characters");
    }

    await mongoose.connect(mongoUri);

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("This email already belongs to an existing account.");
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const admin = new User({
      name: "Administrator",
      email,
      password: hashedPassword,
      role: "admin"
    });

    await admin.save();
    console.log("Admin account created successfully!");
  } catch (error) {
    console.error("Admin setup failed:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

createAdmin();
```[cite: 4]

---

### 3. Update `backend/controllers/authController.js` (JWT Payload)
Ensure your login function generates tokens containing the user's role[cite: 4]:

```javascript
const token = jwt.sign(
  {
    email: student.email,
    role: student.role
  },
  process.env.JWT_SECRET,
  {
    subject: String(student._id || student.id),
    expiresIn: process.env.JWT_EXPIRES_IN || "1h"
  }
);
```[cite: 4]

---

### 4. Update `backend/routes/courseRoutes.js` (Role Protection)
Protect your write operations using `authorizeRoles("admin")`[cite: 4]:

```javascript
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");
const courseController = require("../controllers/courseController");

// Public/Student GET routes remain unprotected or auth-only
router.get("/", courseController.getAllCourses);
router.get("/:id", courseController.getCourseById);

// Admin-only write routes
router.post(
  "/",
  authMiddleware,
  authorizeRoles("admin"),
  courseController.createCourse
);

router.put(
  "/:id",
  authMiddleware,
  authorizeRoles("admin"),
  courseController.updateCourse
);

router.delete(
  "/:id",
  authMiddleware,
  authorizeRoles("admin"),
  courseController.deleteCourse
);

module.exports = router;
```[cite: 4]