const mongoose = require("mongoose");

const enrollmentSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true
    },
    enrolledAt: {
      type: Date,
      default: Date.now
    },
    status: {
      type: String,
      enum: ["active", "completed"],
      default: "active"
    }
  },
  {
    timestamps: true
  }
);

// Prevent duplicate enrollments
enrollmentSchema.index(
  { student: 1, course: 1 },
  { unique: true }
);

module.exports = mongoose.model("Enrollment", enrollmentSchema);
```[cite: 3]

---

### Step 2: Create the Enrollment Controller
Create a new file at **`backend/controllers/enrollmentController.js`** to handle enrollment creation, fetching a student's enrolled courses, and unenrollment[cite: 3]:

```javascript
const mongoose = require("mongoose");
const Enrollment = require("../models/Enrollment");
const Course = require("../models/Course");

async function enrollCourse(req, res, next) {
  try {
    const studentId = req.user.sub;
    const { courseId } = req.body;

    if (!mongoose.isValidObjectId(studentId)) {
      return res.status(401).json({ message: "Invalid student identity" });
    }
    if (!mongoose.isValidObjectId(courseId)) {
      return res.status(400).json({ message: "Valid course ID is required" });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const existingEnrollment = await Enrollment.findOne({
      student: studentId,
      course: courseId
    });

    if (existingEnrollment) {
      return res.status(409).json({ message: "Already enrolled in this course" });
    }

    const enrollment = await Enrollment.create({
      student: studentId,
      course: courseId
    });

    return res.status(201).json({
      message: "Course enrollment successful",
      enrollment
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: "Already enrolled in this course" });
    }
    next(error);
  }
}

async function getMyCourses(req, res, next) {
  try {
    const studentId = req.user.sub;

    if (!mongoose.isValidObjectId(studentId)) {
      return res.status(401).json({ message: "Invalid student identity" });
    }

    const enrollments = await Enrollment.find({
      student: studentId
    })
      .populate("course")
      .sort({ enrolledAt: -1 });

    return res.status(200).json({
      message: "Enrolled courses fetched successfully",
      totalEnrollments: enrollments.length,
      enrollments
    });
  } catch (error) {
    next(error);
  }
}

async function unenrollCourse(req, res, next) {
  try {
    const studentId = req.user.sub;
    const { courseId } = req.params;

    if (!mongoose.isValidObjectId(studentId) || !mongoose.isValidObjectId(courseId)) {
      return res.status(400).json({ message: "Invalid student or course ID" });
    }

    const enrollment = await Enrollment.findOneAndDelete({
      student: studentId,
      course: courseId
    });

    if (!enrollment) {
      return res.status(404).json({ message: "You are not enrolled in this course" });
    }

    return res.status(200).json({ message: "Successfully unenrolled from course" });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  enrollCourse,
  getMyCourses,
  unenrollCourse
};
```[cite: 3]

---

### Step 3: Create Enrollment Routes
Create a new file at **`backend/routes/enrollmentRoutes.js`**[cite: 3]:

```javascript
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");
const {
  enrollCourse,
  getMyCourses,
  unenrollCourse
} = require("../controllers/enrollmentController");

// Only students can view their enrolled courses
router.get(
  "/my-courses",
  authMiddleware,
  authorizeRoles("student"),
  getMyCourses
);

// Only students can enroll in courses
router.post(
  "/",
  authMiddleware,
  authorizeRoles("student"),
  enrollCourse
);

// Only students can unenroll from courses
router.delete(
  "/:courseId",
  authMiddleware,
  authorizeRoles("student"),
  unenrollCourse
);

module.exports = router;
```[cite: 3]

---

### Step 4: Register Routes in `server.js`
Open your backend entry point (**`backend/server.js`**) and mount the enrollment routes[cite: 3]:

```javascript
const enrollmentRoutes = require("./routes/enrollmentRoutes");

// Place this after your app is initialized and before error handlers:
app.use("/api/v1/enrollments", enrollmentRoutes);
```[cite: 3]

---

### Step 5: Frontend Component (`src/components/MyCourses.jsx`)
Create this file in your React frontend so students can view and unenroll from their courses[cite: 3]:

```javascript
import { useEffect, useState } from "react";
import apiClient from "../api/apiClient"; // Make sure path matches your setup

function MyCourses() {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchMyCourses() {
      try {
        const response = await apiClient.get("/enrollments/my-courses");
        setEnrollments(response.data.enrollments);
      } catch (err) {
        setError("Unable to load enrolled courses");
      } finally {
        setLoading(false);
      }
    }
    fetchMyCourses();
  }, []);

  const handleUnenroll = async (courseId) => {
    const confirmed = window.confirm("Are you sure you want to unenroll from this course?");
    if (!confirmed) return;

    try {
      await apiClient.delete(`/enrollments/${courseId}`);
      setEnrollments((previous) =>
        previous.filter((enrollment) => enrollment.course?._id !== courseId)
      );
      alert("Successfully unenrolled from the course!");
    } catch (error) {
      alert(error.response?.data?.message || "Unable to unenroll from this course");
    }
  };

  if (loading) return <p>Loading enrolled courses...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>My Enrolled Courses</h2>
      {enrollments.length === 0 ? (
        <p>You haven't enrolled in any courses yet.</p>
      ) : (
        <div>
          {enrollments.map((enrollment) => (
            <div key={enrollment._id} style={{ border: "1px solid #ddd", padding: "12px", marginBottom: "10px" }}>
              <h3>{enrollment.course?.title || "Course unavailable"}</h3>
              <p>Status: {enrollment.status}</p>
              <p>Enrolled on: {new Date(enrollment.enrolledAt).toLocaleDateString()}</p>
              <button 
                onClick={() => handleUnenroll(enrollment.course._id)}
                disabled={!enrollment.course}
              >
                Unenroll
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyCourses;
```[cite: 3]

Let me know once you have these files set up, and we can move directly into **Task 13 (Learning Progress Tracking)**[cite: 3]!