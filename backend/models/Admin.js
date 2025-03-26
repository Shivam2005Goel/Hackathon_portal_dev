const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  adminID: { type: String, unique: true, required: true },   // Unique identifier for the admin
  name: { type: String, required: true },                    // Last name
  email: { type: String, unique: true, required: true },     // Email address
  password: { type: String, required: true },                // Hashed password for authentication
  phoneNumber: { type: String },                             // Contact number
});

module.exports = mongoose.model("Admin", adminSchema);
