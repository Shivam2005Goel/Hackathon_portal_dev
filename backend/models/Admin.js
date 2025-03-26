const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  adminID: { type: String, unique: true, required: true }, 
  name: { type: String, required: true },                
  email: { type: String, unique: true, required: true }, 
  password: { type: String, required: true },            
  phoneNumber: { type: String }                         
});

module.exports = mongoose.model("Admin", adminSchema);
