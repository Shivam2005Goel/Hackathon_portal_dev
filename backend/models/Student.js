const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  studentID: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  phoneNumber: { type: String },
  dateOfBirth: { type: Date },
  gender: { type: String },
  course: { type: String, required: true },
  yearOfStudy: { type: Number, required: true },
  department: { type: String, required: true },
  cgpa: { type: Number },
  enrollmentYear: { type: Number },

  // Enrolled Courses with Faculty and Marks Information
  coursesEnrolled: [
    {
      courseID: { type: String, required: true },
      courseName: { type: String, required: true },
      facultyID: { type: String, required: true },
      facultyName: { type: String, required: true },
      marks: { type: Number, default: 0 }  // Marks for this course
    }
  ]
});

module.exports = mongoose.model("Student", studentSchema);
