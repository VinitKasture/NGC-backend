const express = require("express");
const router = express.Router();

// Controllers
const {
  login,
  signup,
  addCourse,
  createAdmission,
  getAllCourses,
  getAllCoursesNames,
  getAllClients,
  addInstallment,
} = require("../Controllers/admin.controller");
const { validateToken } = require("../middleware/jwt");

// Middlewares

router.post("/admin/signup", signup);
router.post("/admin/login", login);
// router.post("/admin/add-course", addCourse);
router.post("/user-admission", createAdmission);
router.get("/get-course-details", getAllCourses);
router.get("/admin/get-all-clients", getAllClients);
router.post("/admin/add-installment", addInstallment);

// Public apis
router.get("/get-all-courses", getAllCourses);

module.exports = router;
