const mongoose = require("mongoose");
const express = require('express');
const Course = require('./models/Course');
const Student = require('./models/Student.js');
const { body, validationResult } = require('express-validator');
const path = require('path');

var cors = require('cors')
const app = express()
app.set("view engine", "ejs");

app.use(cors());

const mongoURI = "mongodb://127.0.0.1:27017/Hackathon"; // Replace with your DB name

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected successfully!"))
  .catch((err) => console.error("MongoDB connection error:", err));


const port = 4000

app.use(express.json());

app.use('/api/auth/student',require('./routes/auth/student'));
app.use('/api/auth/faculty',require('./routes/auth/faculty'));
app.use('/api/auth/admin',require('./routes/auth/admin'));




// Show add student form


app.get('/facultylogin', (req, res) => {
    res.send('Hello World!');
})

app.get('/adminlogin', (req, res) => {
    res.send('Hello World!');
})


// ENROLL A STUDENT FOR THE COURSE
app.post('/enrollstudent', async (req, res) => {
  try {
      const { studentID, courseID, courseName, facultyID, facultyName } = req.body;

      // Find the student
      let student = await Student.findOne({ studentID });
      if (!student) {
          return res.status(404).json({ error: "Student not found" });
      }

      // Check if the course is already added
      const isAlreadyEnrolled = student.coursesEnrolled.some(course => course.courseID === courseID);
      if (isAlreadyEnrolled) {
          return res.status(400).json({ error: "Student is already enrolled in this course" });
      }

      // Add course to student
      student.coursesEnrolled.push({ courseID, courseName, facultyID, facultyName });
      await student.save();

      // Find the course
      let course = await Course.findOne({ courseID });
      if (!course) {
          return res.status(404).json({ error: "Course not found" });
      }

      // Check if the student is already in the course
      const isStudentInCourse = course.students.some(s => s.studentID === studentID);
      if (isStudentInCourse) {
          return res.status(400).json({ error: "Student is already added to this course" });
      }

      // Add student to course
      course.students.push({ studentID, name: student.name });
      await course.save();

      res.status(200).json({ message: "Student enrolled successfully", student, course });

  } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get('/index', (req, res) => {
    res.render('index'); // No need for .ejs extension
});


// REMOVE THE COURSE
app.post('/removeCourse', async (req, res) => {
  try {
      const { studentID, courseID } = req.body;

      // Find the student
      let student = await Student.findOne({ studentID });
      if (!student) {
          return res.status(404).json({ error: "Student not found" });
      }

      // Check if the student is enrolled in the course
      const courseIndex = student.coursesEnrolled.findIndex(course => course.courseID === courseID);
      if (courseIndex === -1) {
          return res.status(400).json({ error: "Student is not enrolled in this course" });
      }

      // Remove the course from the student's enrolled list
      student.coursesEnrolled.splice(courseIndex, 1);
      await student.save();

      // Find the course
      let course = await Course.findOne({ courseID });
      if (!course) {
          return res.status(404).json({ error: "Course not found" });
      }

      // Remove the student from the course's student list
      course.students = course.students.filter(s => s.studentID !== studentID);
      await course.save();

      res.status(200).json({ message: "Course removed successfully", student, course });

  } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET THE ATTENDANCE
app.get('/getAttendance/:studentID', async (req, res) => {
  try {
      const { studentID } = req.params;

      // Find the student
      const student = await Student.findOne({ studentID });
      if (!student) {
          return res.status(404).json({ error: "Student not found" });
      }

      // Get all enrolled course IDs
      const enrolledCourses = student.coursesEnrolled.map(course => course.courseID);

      // Find attendance records for these courses
      const courses = await Course.find({ courseID: { $in: enrolledCourses } });

      // Format attendance response
      let attendanceData = courses.map(course => {
          let studentRecord = course.students.find(s => s.studentID === studentID);
          return {
              courseID: course.courseID,
              courseName: course.courseName,
              attendance: studentRecord ? studentRecord.attendance : []
          };
      });

      res.status(200).json({ studentID, attendance: attendanceData });

  } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Internal Server Error" });
  }
});



app.post('/addCourse', [
  body('courseID').notEmpty().withMessage('Course ID is required'),
  body('courseName').notEmpty().withMessage('Course Name is required'),
  body('facultyID').notEmpty().withMessage('Faculty ID is required'),
  body('facultyName').notEmpty().withMessage('Faculty Name is required')
], async (req, res) => {
  try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
      }

      const { courseID, courseName, facultyID, facultyName } = req.body;

      // Check if the course already exists
      let existingCourse = await Course.findOne({ courseID });
      if (existingCourse) {
          return res.status(400).json({ error: "Course with this ID already exists" });
      }

      // Create a new course
      const newCourse = new Course({
          courseID,
          courseName,
          faculty: { facultyID, name: facultyName },
          students: []
      });

      // Save course to database
      await newCourse.save();
      res.status(201).json({ message: "Course added successfully", course: newCourse });

  } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Internal Server Error" });
  }
});


app.get('/announcement',(req,res)=>{
    res.render("admin3");
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})


