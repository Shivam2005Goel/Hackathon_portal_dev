const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    courseID: { type: String, unique: true, required: true },
    courseName: { type: String, required: true },
    faculty: { 
        facultyID: { type: String, required: true },
        name: { type: String, required: true }
    },
    students: [
        {
            studentID: { type: String, required: true },
            name: { type: String, required: true },
            attendance: [
                {
                    date: { type: Date, default: Date.now },
                    status: { type: String, enum: ['Present', 'Absent'], required: true }
                }
            ]
        }
    ]
});

module.exports = mongoose.model('Course', CourseSchema);
