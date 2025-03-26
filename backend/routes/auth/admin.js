const express = require('express');
const router = express.Router();
const Admin = require('../../models/Admin.js');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const FetchUser = require("../../middleware/FetchAdmin.js");

const JWT_SECRET = "adminSecret";

// Admin Registration
router.post('/createUser', [
    body('adminID').notEmpty(),
    body('name').notEmpty(),
    body("password").isLength({ min: 6 })
], async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() });
    }

    try {
        const { adminID, name, email, password, phoneNumber } = req.body;

        let adminExists = await Admin.findOne({ adminID });
        if (adminExists) {
            return res.status(400).json({ error: "Admin ID already exists" });
        }

        // Hash Password
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(password, salt);

        // Create Admin
        const admin = await Admin.create({
            adminID, name, email, password: secPass, phoneNumber
        });

        // Generate JWT Token
        const data = { user: { id: admin.adminID } };
        const authToken = jwt.sign(data, JWT_SECRET);

        res.json({ authToken });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Some Server Error occurred" });
    }
});

// Admin Login (Using adminID)
router.post("/login", [
    body("adminID").notEmpty(),
    body("password").exists()
], async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).json({ error: "Please enter valid credentials" });
    }

    try {
        const { adminID, password } = req.body;

        // Find Admin by adminID
        const admin = await Admin.findOne({ adminID });
        if (!admin) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        // Compare Password
        const checkPass = await bcrypt.compare(password, admin.password);
        if (!checkPass) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        // Generate JWT Token
        const data = { user: { id: admin.adminID } };
        const authToken = jwt.sign(data, JWT_SECRET);

        res.json({ authToken });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Fetch Admin Details
router.get('/getUser', FetchUser, async (req, res) => {
    try {
        const admin = await Admin.findOne({ adminID: req.user.id }).select("-password");
        if (!admin) {
            return res.status(404).json({ error: "Admin not found" });
        }
        res.json(admin);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Some Server Error occurred" });
    }
});

module.exports = router;
