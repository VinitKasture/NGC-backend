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
  getClientsCountByCourses,
  getPopularCourses,
  updateCourseStatus,
  getRevenueDetails,
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
router.get("/admin/get-clients-count-by-courses", getClientsCountByCourses);
router.get("/admin/get-courses-popularity", getPopularCourses);
router.post("/admin/update-course-status", updateCourseStatus);
router.get("/admin/get-revenue-details", getRevenueDetails);

// Public apis
router.get("/get-all-courses", getAllCourses);

module.exports = router;
