const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  fees: {
    type: String,
    required: true,
  },
  monthlyInstallment: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model("Course", CourseSchema);
