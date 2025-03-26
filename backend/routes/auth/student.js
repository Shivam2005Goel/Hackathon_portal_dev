const express = require('express');
const router = express.Router();
const Student = require('../../models/Student.js');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const FetchUser = require("../../middleware/FetchStudent.js");

const JWT_SECRET = "studentSecret";

// Student Registration
router.post('/createUser', [
    body('studentID').notEmpty(),
    body('name').notEmpty(),
    body("password").isLength({ min: 6 })
], async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() });
    }

    try {
        const { studentID, name, email, password, phoneNumber, dateOfBirth, gender, course, yearOfStudy, department, cgpa, enrollmentYear, marks } = req.body;

        let studentExists = await Student.findOne({ studentID });
        if (studentExists) {
            return res.status(400).json({ error: "Student ID already exists" });
        }

        // Hash Password
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(password, salt);

        // Create Student
        const student = await Student.create({
            studentID, name, email, password: secPass, phoneNumber,
            dateOfBirth, gender, course, yearOfStudy, department, cgpa,
            enrollmentYear, marks
        });

        // Generate JWT Token
        const data = { user: { id: student.studentID } };
        const authToken = jwt.sign(data, JWT_SECRET);

        res.json({ authToken });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Some Server Error occurred" });
    }
});

// Student Login (Using studentID)
router.post("/login", [
    body("studentID").notEmpty(),
    body("password").exists()
], async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).json({ error: "Please enter valid credentials" });
    }

    try {
        const { studentID, password } = req.body;

        // Find Student by studentID
        const student = await Student.findOne({ studentID });
        if (!student) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        // Compare Password
        const checkPass = await bcrypt.compare(password, student.password);
        if (!checkPass) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        // Generate JWT Token
        const data = { user: { id: student.studentID } };
        const authToken = jwt.sign(data, JWT_SECRET);

        res.json({ authToken });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Fetch Student Details
router.get('/getUser', FetchUser, async (req, res) => {
    try {
        const student = await Student.findOne({ studentID: req.user.id }).select("-password");
        if (!student) {
            return res.status(404).json({ error: "Student not found" });
        }
        res.json(student);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Some Server Error occurred" });
    }
});

module.exports = router;
