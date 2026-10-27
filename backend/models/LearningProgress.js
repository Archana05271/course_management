const mongoose = require("mongoose");

const learningProgressSchema = new mongoose.Schema(
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
    completedLessons: {
      type: Number,
      default: 0,
      min: 0
    },
    totalLessons: {
      type: Number,
      required: true,
      min: 1
    },
    progressPercentage: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    },
    lastAccessedAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

// One progress record per student per course
learningProgressSchema.index(
  { student: 1, course: 1 },
  { unique: true }
);

// Calculate progress automatically before saving
learningProgressSchema.pre("save", function () {
  if (this.completedLessons > this.totalLessons) {
    throw new Error("Completed lessons cannot exceed total lessons");
  }
  this.progressPercentage = Math.round(
    (this.completedLessons / this.totalLessons) * 100
  );
});

module.exports = mongoose.model("LearningProgress", learningProgressSchema);
```[cite: 3]

---

### Step 2: Create the Learning Progress Controller
Create a new file at **`backend/controllers/learningProgressController.js`**[cite: 3]:

```javascript
const mongoose = require("mongoose");
const LearningProgress = require("../models/LearningProgress");
const Enrollment = require("../models/Enrollment");

async function updateProgress(req, res, next) {
  try {
    const studentId = req.user.sub;
    const { courseId, completedLessons, totalLessons } = req.body;

    if (!mongoose.isValidObjectId(studentId) || !mongoose.isValidObjectId(courseId)) {
      return res.status(400).json({ message: "Invalid student or course ID" });
    }

    if (
      !Number.isInteger(completedLessons) ||
      !Number.isInteger(totalLessons) ||
      totalLessons < 1 ||
      completedLessons < 0 ||
      completedLessons > totalLessons
    ) {
      return res.status(400).json({ message: "Invalid lesson progress values" });
    }

    const enrollment = await Enrollment.findOne({
      student: studentId,
      course: courseId,
      status: { $in: ["active", "completed"] }
    });

    if (!enrollment) {
      return res.status(403).json({ message: "You must be enrolled in this course" });
    }

    let progress = await LearningProgress.findOne({
      student: studentId,
      course: courseId
    });

    if (!progress) {
      progress = new LearningProgress({
        student: studentId,
        course: courseId,
        completedLessons,
        totalLessons
      });
    } else {
      progress.completedLessons = completedLessons;
      progress.totalLessons = totalLessons;
    }

    progress.lastAccessedAt = new Date();
    await progress.save();

    if (progress.progressPercentage === 100) {
      await Enrollment.findOneAndUpdate(
        { student: studentId, course: courseId },
        { $set: { status: "completed" } }
      );
    }

    return res.status(200).json({
      message: "Learning progress updated successfully",
      progress
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: "Progress record already exists. Please retry." });
    }
    next(error);
  }
}

async function getMyProgress(req, res, next) {
  try {
    const studentId = req.user.sub;

    if (!mongoose.isValidObjectId(studentId)) {
      return res.status(401).json({ message: "Invalid student identity" });
    }

    const enrollments = await Enrollment.find({
      student: studentId,
      status: { $in: ["active", "completed"] }
    }).select("course");

    const courseIds = enrollments.map((enrollment) => enrollment.course);

    const progressRecords = await LearningProgress.find({
      student: studentId,
      course: { $in: courseIds }
    })
      .populate("course", "title")
      .sort({ updatedAt: -1 });

    return res.status(200).json({
      message: "Learning progress fetched successfully",
      totalCourses: progressRecords.length,
      progress: progressRecords
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  updateProgress,
  getMyProgress
};
```[cite: 3]

---

### Step 3: Create the Learning Progress Routes
Create a new file at **`backend/routes/learningProgressRoutes.js`**[cite: 3]:

```javascript
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");
const {
  updateProgress,
  getMyProgress
} = require("../controllers/learningProgressController");

router.get(
  "/my-progress",
  authMiddleware,
  authorizeRoles("student"),
  getMyProgress
);

router.put(
  "/",
  authMiddleware,
  authorizeRoles("student"),
  updateProgress
);

module.exports = router;
```[cite: 3]

---

### Step 4: Register Routes in `server.js`
Open your backend entry point (**`backend/server.js`**) and add[cite: 3]:

```javascript
const learningProgressRoutes = require("./routes/learningProgressRoutes");

// Place this after your app initialization and before error handlers:
app.use("/api/v1/progress", learningProgressRoutes);
```[cite: 3]

---

### Step 5: Frontend Component (`src/components/MyLearningProgress.jsx`)
Create this file in your React frontend[cite: 3]:

```javascript
import { useEffect, useState } from "react";
import apiClient from "../api/apiClient";

function ProgressUpdater({ item, onUpdate }) {
  const [completed, setCompleted] = useState(String(item.completedLessons));

  const handleSubmit = (event) => {
    event.preventDefault();
    const value = Number(completed);
    if (!Number.isInteger(value) || value < 0 || value > item.totalLessons) {
      alert("Enter a valid number of completed lessons");
      return;
    }
    onUpdate(item.course._id, value, item.totalLessons);
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "10px" }}>
      <label>
        Completed Lessons:{" "}
        <input
          type="number"
          min="0"
          max={item.totalLessons}
          step="1"
          value={completed}
          onChange={(event) => setCompleted(event.target.value)}
          required
        />
      </label>
      <button type="submit" style={{ marginLeft: "8px" }}>
        Update Progress
      </button>
    </form>
  );
}

function MyLearningProgress() {
  const [progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProgress() {
      try {
        const response = await apiClient.get("/progress/my-progress");
        setProgress(response.data.progress || []);
      } catch (err) {
        setError("Unable to load learning progress");
      } finally {
        setLoading(false);
      }
    }
    fetchProgress();
  }, []);

  const handleUpdateProgress = async (courseId, completedLessons, totalLessons) => {
    try {
      const response = await apiClient.put("/progress", {
        courseId,
        completedLessons: Number(completedLessons),
        totalLessons: Number(totalLessons)
      });
      const updatedProgress = response.data.progress;
      setProgress((previous) =>
        previous.map((item) =>
          item.course?._id === courseId
            ? {
                ...item,
                completedLessons: updatedProgress.completedLessons,
                totalLessons: updatedProgress.totalLessons,
                progressPercentage: updatedProgress.progressPercentage
              }
            : item
        )
      );
      alert("Learning progress updated successfully!");
    } catch (error) {
      alert(error.response?.data?.message || "Unable to update learning progress");
    }
  };

  const totalCourses = progress.length;
  const completedCourses = progress.filter((item) => item.progressPercentage === 100).length;
  const averageProgress =
    totalCourses > 0
      ? Math.round(
          progress.reduce((sum, item) => sum + item.progressPercentage, 0) / totalCourses
        )
      : 0;

  if (loading) return <p>Loading learning progress...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>My Learning Progress</h2>
      
      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginBottom: "24px" }}>
        <div style={{ border: "1px solid #ddd", padding: "16px", borderRadius: "8px", flex: 1 }}>
          <h3>Total Courses</h3>
          <h2>{totalCourses}</h2>
        </div>
        <div style={{ border: "1px solid #ddd", padding: "16px", borderRadius: "8px", flex: 1 }}>
          <h3>Completed Courses</h3>
          <h2>{completedCourses}</h2>
        </div>
        <div style={{ border: "1px solid #ddd", padding: "16px", borderRadius: "8px", flex: 1 }}>
          <h3>Average Progress</h3>
          <h2>{averageProgress}%</h2>
        </div>
      </div>

      {progress.length === 0 ? (
        <p>No learning progress recorded yet.</p>
      ) : (
        progress.map((item) => (
          <div
            key={item._id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "16px",
              marginBottom: "16px"
            }}
          >
            <h3>{item.course?.title || "Course unavailable"}</h3>
            <p>Completed: {item.completedLessons} / {item.totalLessons} lessons</p>
            <progress value={item.progressPercentage} max="100" style={{ width: "100%" }} />
            <p>{item.progressPercentage}% Completed</p>
            <p>Status: {item.progressPercentage === 100 ? "Completed" : "In Progress"}</p>
            
            {item.course && item.progressPercentage < 100 && (
              <ProgressUpdater item={item} onUpdate={handleUpdateProgress} />
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default MyLearningProgress;
```[cite: 3]