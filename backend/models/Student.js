const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
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
  marks:{type : array}

});

module.exports = mongoose.model('user',UserSchema)