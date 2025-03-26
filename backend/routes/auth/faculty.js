const express = require('express');
const router = express.Router();
const Faculty = require('../../models/Faculty.js');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const FetchUser = require("../../middleware/FetchFaculty.js");

const JWT_SECRET = "facultySecret";

// Faculty Registration
router.post('/createUser', [
    body('facultyID').notEmpty(),
    body('name').notEmpty(),
    body("password").isLength({ min: 6 })
], async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() });
    }

    try {
        const { facultyID, name, email, password, phoneNumber, department, specialization } = req.body;

        let facultyExists = await Faculty.findOne({ facultyID });
        if (facultyExists) {
            return res.status(400).json({ error: "Faculty ID already exists" });
        }

        // Hash Password
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(password, salt);

        // Create Faculty
        const faculty = await Faculty.create({
            facultyID, name, email, password: secPass, phoneNumber, department, specialization
        });

        // Generate JWT Token
        const data = { user: { id: faculty.facultyID } };
        const authToken = jwt.sign(data, JWT_SECRET);

        res.json({ authToken });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Some Server Error occurred" });
    }
});

// Faculty Login (Using facultyID)
router.post("/login", [
    body("facultyID").notEmpty(),
    body("password").exists()
], async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).json({ error: "Please enter valid credentials" });
    }

    try {
        const { facultyID, password } = req.body;

        // Find Faculty by facultyID
        const faculty = await Faculty.findOne({ facultyID });
        if (!faculty) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        // Compare Password
        const checkPass = await bcrypt.compare(password, faculty.password);
        if (!checkPass) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        // Generate JWT Token
        const data = { user: { id: faculty.facultyID } };
        const authToken = jwt.sign(data, JWT_SECRET);

        res.json({ authToken });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Fetch Faculty Details
router.get('/getUser', FetchUser, async (req, res) => {
    try {
        const faculty = await Faculty.findOne({ facultyID: req.user.id }).select("-password");
        if (!faculty) {
            return res.status(404).json({ error: "Faculty not found" });
        }
        res.json(faculty);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Some Server Error occurred" });
    }
});

module.exports = router;
