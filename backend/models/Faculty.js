const mongoose = require("mongoose");

const facultySchema = new mongoose.Schema({
  facultyID: { type: String, unique: true, required: true },
  name: { type: String, required: true },                        
  email: { type: String, unique: true, required: true },     
  password: { type: String, required: true },                
  phoneNumber: { type: String },                            
  department: { type: String, required: true },

  // Subjects the faculty is teaching
  teaching: [
    {
      courseID: { type: String, required: true },
      courseName: { type: String, required: true }
    }
  ]
});

module.exports = mongoose.model("Faculty", facultySchema);
