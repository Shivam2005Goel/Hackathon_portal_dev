// appfac.js

// Simulated API delay to mimic network latency (for testing purposes)
const simulateDelay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Simulated API calls (to be replaced with real API calls to MongoDB)
const api = {
    async getCourses() {
        await simulateDelay(500);
        return [
            { name: "Operating Systems", code: "CS301", students: 45, icon: "architecture" },
            { name: "Database Management", code: "CS402", students: 38, icon: "functions" },
            { name: "Computer Networks", code: "CS503", students: 50, icon: "computer" }
        ];
        // Future: return fetch('/api/courses').then(res => res.json());
    },

    async getStudents(courseCode) {
        await simulateDelay(500);
        const studentsData = {
            "CS301": [
                { id: "STU001", name: "Amit Kumar" },
                { id: "STU002", name: "Sneha Patel" },
                { id: "STU003", name: "Rahul Sharma" }
            ],
            "CS402": [
                { id: "STU004", name: "Priya Singh" },
                { id: "STU005", name: "Vikram Rao" },
                { id: "STU006", name: "Anjali Gupta" }
            ],
            "CS503": [
                { id: "STU007", name: "Karan Mehta" },
                { id: "STU008", name: "Neha Verma" },
                { id: "STU009", name: "Suresh Yadav" }
            ]
        };
        return studentsData[courseCode] || [];
        // Future: return fetch(`/api/students/${courseCode}`).then(res => res.json());
    },

    async getTimetable() {
        await simulateDelay(500);
        return {
            "Monday": [
                { time: "09:00 - 10:00", room: "A-101", course: "Operating Systems", action: "Mark Attendance" },
                { time: "10:00 - 11:00", room: "A-102", course: "Database Management", action: "Mark Attendance" },
                { time: "11:00 - 12:00", room: "Lab 1", course: "Operating Systems Lab", action: "Mark Attendance" },
                { time: "14:00 - 15:00", room: "A-103", course: "Computer Networks", action: "Mark Attendance" }
            ],
            "Tuesday": [
                { time: "09:00 - 10:00", room: "B-201", course: "Database Management", action: "Mark Attendance" },
                { time: "10:00 - 11:00", room: "B-202", course: "Computer Networks", action: "Mark Attendance" },
                { time: "11:00 - 12:00", room: "A-101", course: "Operating Systems", action: "Mark Attendance" },
                { time: "13:00 - 14:00", room: "Lab 2", course: "Database Management Lab", action: "Mark Attendance" }
            ],
            "Wednesday": [
                { time: "09:00 - 10:00", room: "A-103", course: "Computer Networks", action: "Mark Attendance" },
                { time: "10:00 - 11:00", room: "A-101", course: "Operating Systems", action: "Mark Attendance" },
                { time: "11:00 - 12:00", room: "B-201", course: "Database Management", action: "Mark Attendance" },
                { time: "14:00 - 15:00", room: "Lab 1", course: "Computer Networks Lab", action: "Mark Attendance" }
            ],
            "Thursday": [
                { time: "09:00 - 10:00", room: "A-102", course: "Operating Systems", action: "Mark Attendance" },
                { time: "10:00 - 11:00", room: "B-202", course: "Database Management", action: "Mark Attendance" },
                { time: "11:00 - 12:00", room: "A-103", course: "Computer Networks", action: "Mark Attendance" },
                { time: "13:00 - 14:00", room: "Lab 2", course: "Operating Systems Lab", action: "Mark Attendance" }
            ],
            "Friday": [
                { time: "09:00 - 10:00", room: "B-201", course: "Database Management", action: "Mark Attendance" },
                { time: "10:00 - 11:00", room: "A-101", course: "Operating Systems", action: "Mark Attendance" },
                { time: "11:00 - 12:00", room: "A-103", course: "Computer Networks", action: "Mark Attendance" },
                { time: "14:00 - 15:00", room: "Lab 1", course: "Database Management Lab", action: "Mark Attendance" }
            ]
        };
        // Future: return fetch('/api/timetable').then(res => res.json());
    },

    async getExams() {
        await simulateDelay(500);
        return [
            { course: "Operating Systems", date: "2025-04-10", time: "09:00 - 12:00", room: "A-101" },
            { course: "Database Management", date: "2025-04-12", time: "09:00 - 12:00", room: "B-201" },
            { course: "Computer Networks", date: "2025-04-14", time: "09:00 - 12:00", room: "A-103" }
        ];
        // Future: return fetch('/api/exams').then(res => res.json());
    },

    async saveGrades(courseCode, grades) {
        await simulateDelay(500);
        console.log(`Saving grades for ${courseCode}:`, grades);
        return { success: true, message: `Grades for ${courseCode} saved successfully!` };
        // Future: return fetch('/api/grades', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ courseCode, grades })
        // }).then(res => res.json());
    },

    async saveAttendance(courseCode, date, attendance) {
        await simulateDelay(500);
        console.log(`Saving attendance for ${courseCode} on ${date}:`, attendance);
        return { success: true, message: `Attendance for ${courseCode} on ${date} saved successfully!` };
        // Future: return fetch('/api/attendance', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ courseCode, date, attendance })
        // }).then(res => res.json());
    },

    async sendAnnouncement(message, sender = "Faculty") {
        await simulateDelay(500);
        const timestamp = new Date().toISOString();
        console.log(`Sending announcement: ${message}`);
        return { success: true, message: `Announcement sent: "${message}"`, timestamp, sender };
        // Future: return fetch('/api/announcements', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ message, sender, timestamp: new Date().toISOString() })
        // }).then(res => res.json());
    },

    async getAnnouncements() {
        await simulateDelay(500);
        return [
            { id: "1", sender: "Admin", message: "Faculty meeting scheduled for March 28, 2025.", timestamp: "2025-03-26T10:00:00Z" },
            { id: "2", sender: "Evaluation", message: "Submit grades by April 5, 2025.", timestamp: "2025-03-25T09:00:00Z" },
            { id: "3", sender: "Academic", message: "New course materials uploaded.", timestamp: "2025-03-24T08:00:00Z" }
        ];
        // Future: return fetch('/api/announcements').then(res => res.json());
    },

    async deleteAnnouncement(announcementId) {
        await simulateDelay(500);
        console.log(`Deleting announcement with ID: ${announcementId}`);
        return { success: true, message: `Announcement with ID ${announcementId} deleted successfully!` };
        // Future: return fetch(`/api/announcements/${announcementId}`, {
        //     method: 'DELETE'
        // }).then(res => res.json());
    }
};

// Utility to format dates (used in exam-schedule.html and announcements)
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });
}

// Shared utility for showing confirmation messages
function showConfirmation(message) {
    alert(message);
}

// Initialize all functionality when the DOM is loaded
document.addEventListener('DOMContentLoaded', async () => {
    // Theme Toggler (used in all pages)
    const themeToggler = document.querySelector('.theme-toggler');
    if (themeToggler) {
        themeToggler.addEventListener('click', () => {
            document.body.classList.toggle('dark');
            themeToggler.children[0].classList.toggle('active');
            themeToggler.children[1].classList.toggle('active');
        });
    }

    // Timetable functionality (used in facdash.html and timetable.html)
    const timetable = document.getElementById('timetable');
    const timetableDay = document.getElementById('timetable-day');
    const timetableBody = document.getElementById('timetable-body');
    const prevDay = document.getElementById('prevDay');
    const nextDay = document.getElementById('nextDay');

    if (timetable && timetableDay && timetableBody) {
        const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
        const today = new Date();
        let currentDayIndex = today.getDay() - 1; // Adjust for Monday (1) to be index 0
        if (currentDayIndex < 0 || currentDayIndex > 4) {
            currentDayIndex = 0; // Default to Monday if it's Saturday/Sunday
        }

        // Function to render the timetable for a given day
        async function renderTimetable(dayIndex) {
            const day = daysOfWeek[dayIndex];
            timetableDay.textContent = `${day}'s Timetable`;
            timetableBody.innerHTML = ''; // Clear existing rows

            const timetableData = await api.getTimetable();
            const schedule = timetableData[day];
            schedule.forEach(slot => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${slot.time}</td>
                    <td>${slot.room}</td>
                    <td>${slot.course}</td>
                    <td><a href="#">${slot.action}</a></td>
                `;
                timetableBody.appendChild(row);
            });
        }

        // Initial render (current day)
        await renderTimetable(currentDayIndex);

        // Previous day navigation
        if (prevDay) {
            prevDay.addEventListener('click', async () => {
                currentDayIndex = (currentDayIndex - 1 + daysOfWeek.length) % daysOfWeek.length;
                await renderTimetable(currentDayIndex);
            });
        }

        // Next day navigation
        if (nextDay) {
            nextDay.addEventListener('click', async () => {
                currentDayIndex = (currentDayIndex + 1) % daysOfWeek.length;
                await renderTimetable(currentDayIndex);
            });
        }

        // Timetable toggle (specific to facdash.html and timetable.html)
        const timetableContainer = document.getElementById('timetable');
        if (timetableContainer) {
            // Check if we're on facdash.html (where timetable is initially hidden)
            if (document.querySelector('.container')) {
                timetableContainer.style.display = 'none'; // Initially hidden on facdash.html
                const timetableLinks = document.querySelectorAll('a[href="timetable.html"]');
                timetableLinks.forEach(link => {
                    link.addEventListener('click', (e) => {
                        e.preventDefault();
                        timetableContainer.style.display = timetableContainer.style.display === 'none' ? 'block' : 'none';
                    });
                });

                const closeBtn = document.querySelector('.closeBtn');
                if (closeBtn) {
                    closeBtn.addEventListener('click', () => {
                        timetableContainer.style.display = 'none';
                    });
                }
            } else {
                // On timetable.html, toggle visibility with class
                timetableContainer.classList.add('active');
                const timetableLinks = document.querySelectorAll('a[href="timetable.html"]');
                timetableLinks.forEach(link => {
                    link.addEventListener('click', (e) => {
                        e.preventDefault();
                        timetableContainer.classList.toggle('active');
                    });
                });
            }
        }
    }

    // facdash.html: Populate Assigned Courses
    const selectedCourseDiv = document.getElementById('selected-course');
    if (selectedCourseDiv) {
        const loadCourses = async () => {
            const courses = await api.getCourses();
            const defaultCourse = courses[0]; // Default to the first course
            selectedCourseDiv.innerHTML = `
                <span class="material-icons-sharp">${defaultCourse.icon}</span>
                <h3>${defaultCourse.name}</h3>
                <h2>${defaultCourse.code}</h2>
                <small class="text-muted">${defaultCourse.students} Students</small>
            `;
        };
        loadCourses();
    }

    // announcements.html: Handle Announcements
    const announcementList = document.getElementById('announcement-list');
    if (announcementList) {
        const newAnnouncementText = document.getElementById('new-announcement-text');
        const sendAnnouncementBtn = document.getElementById('send-announcement');

        // Function to load and render announcements
        const loadAnnouncements = async () => {
            const announcements = await api.getAnnouncements();
            announcementList.innerHTML = '';
            announcements.forEach(announcement => {
                const div = document.createElement('div');
                div.classList.add('announcement-item');
                div.innerHTML = `
                    <div>
                        <p><b>${announcement.sender}</b>: ${announcement.message}</p>
                        <small>${formatDate(announcement.timestamp)}</small>
                    </div>
                    <button class="delete-btn" data-id="${announcement.id}">
                        <span class="material-icons-sharp">delete</span>
                    </button>
                `;
                announcementList.appendChild(div);

                // Add delete functionality
                const deleteBtn = div.querySelector('.delete-btn');
                deleteBtn.addEventListener('click', async () => {
                    const confirmDelete = confirm(`Are you sure you want to delete this announcement?`);
                    if (confirmDelete) {
                        const response = await api.deleteAnnouncement(announcement.id);
                        showConfirmation(response.message);
                        await loadAnnouncements(); // Refresh the list
                    }
                });
            });
        };

        // Initial load of announcements
        await loadAnnouncements();

        // Send new announcement
        sendAnnouncementBtn.addEventListener('click', async () => {
            const message = newAnnouncementText.value.trim();
            if (!message) {
                showConfirmation("Please enter an announcement message.");
                return;
            }

            const response = await api.sendAnnouncement(message);
            showConfirmation(response.message);
            newAnnouncementText.value = ''; // Clear the textarea
            await loadAnnouncements(); // Refresh the list
        });
    }

    // choose-course.html: Populate Course List
    const courseList = document.getElementById('course-list');
    if (courseList) {
        const selectedCourseDiv = document.getElementById('selected-course');
        const selectedCourseDetails = document.getElementById('selected-course-details');

        const loadCourses = async () => {
            const courses = await api.getCourses();
            courses.forEach(course => {
                const courseItem = document.createElement('div');
                courseItem.classList.add('course-item');
                courseItem.innerHTML = `
                    <span class="material-icons-sharp">${course.icon}</span>
                    <h3>${course.name}</h3>
                    <small>${course.students} Students</small>
                `;
                courseItem.addEventListener('click', () => {
                    selectedCourseDetails.innerHTML = `
                        ${course.name} (${course.code}) - ${course.students} Students
                    `;
                    selectedCourseDiv.style.display = 'block';
                    showConfirmation(`Selected course: ${course.name} (${course.code})`);
                });
                courseList.appendChild(courseItem);
            });
        };
        loadCourses();
    }

    // exam-schedule.html: Populate Exam Schedule
    const examScheduleBody = document.getElementById('exam-schedule-body');
    if (examScheduleBody) {
        const loadExams = async () => {
            const exams = await api.getExams();
            exams.forEach(exam => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${exam.course}</td>
                    <td>${formatDate(exam.date)}</td>
                    <td>${exam.time}</td>
                    <td>${exam.room}</td>
                `;
                examScheduleBody.appendChild(row);
            });
        };
        loadExams();
    }

    // grade-entry.html: Populate Course Dropdown and Handle Grade Entry
    const courseSelect = document.getElementById('course-select');
    if (courseSelect) {
        const gradeTable = document.getElementById('grade-table');
        const gradeTableBody = document.getElementById('grade-table-body');
        const saveButton = document.getElementById('save-grades');

        // Populate course dropdown
        const loadCourses = async () => {
            const courses = await api.getCourses();
            courses.forEach(course => {
                const option = document.createElement('option');
                option.value = course.code;
                option.textContent = `${course.name} (${course.code})`;
                courseSelect.appendChild(option);
            });
        };
        loadCourses();

        // Load students when a course is selected
        courseSelect.addEventListener('change', async () => {
            const courseCode = courseSelect.value;
            if (!courseCode) {
                gradeTable.style.display = 'none';
                saveButton.style.display = 'none';
                return;
            }

            const students = await api.getStudents(courseCode);
            gradeTableBody.innerHTML = '';

            students.forEach(student => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${student.id}</td>
                    <td>${student.name}</td>
                    <td><input type="number" min="0" max="100" id="grade-${student.id}" placeholder="Enter grade"></td>
                `;
                gradeTableBody.appendChild(row);
            });

            gradeTable.style.display = 'table';
            saveButton.style.display = 'block';
        });

        // Save grades
        saveButton.addEventListener('click', async () => {
            const courseCode = courseSelect.value;
            const students = await api.getStudents(courseCode);

            const grades = students.map(student => {
                const gradeInput = document.getElementById(`grade-${student.id}`);
                return {
                    id: student.id,
                    name: student.name,
                    grade: gradeInput.value || 'Not entered'
                };
            });

            const response = await api.saveGrades(courseCode, grades);
            showConfirmation(response.message + `\n${JSON.stringify(grades, null, 2)}`);
        });
    }

    // attendance.html: Mark Attendance
    const attendanceCourseSelect = document.getElementById('course-select');
    const attendanceDateInput = document.getElementById('attendance-date');
    if (attendanceCourseSelect && attendanceDateInput) {
        const attendanceTable = document.getElementById('attendance-table');
        const attendanceTableBody = document.getElementById('attendance-table-body');
        const saveButton = document.getElementById('save-attendance');

        // Populate course dropdown
        const loadCourses = async () => {
            const courses = await api.getCourses();
            courses.forEach(course => {
                const option = document.createElement('option');
                option.value = course.code;
                option.textContent = `${course.name} (${course.code})`;
                attendanceCourseSelect.appendChild(option);
            });
        };
        loadCourses();

        // Set default date to today
        const today = new Date().toISOString().split('T')[0];
        attendanceDateInput.value = today;

        // Load students when a course is selected
        attendanceCourseSelect.addEventListener('change', async () => {
            const courseCode = attendanceCourseSelect.value;
            if (!courseCode) {
                attendanceTable.style.display = 'none';
                saveButton.style.display = 'none';
                return;
            }

            const students = await api.getStudents(courseCode);
            attendanceTableBody.innerHTML = '';

            students.forEach(student => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${student.id}</td>
                    <td>${student.name}</td>
                    <td>
                        <select id="status-${student.id}">
                            <option value="Present">Present</option>
                            <option value="Absent">Absent</option>
                        </select>
                    </td>
                `;
                attendanceTableBody.appendChild(row);
            });

            attendanceTable.style.display = 'table';
            saveButton.style.display = 'block';
        });

        // Save attendance
        saveButton.addEventListener('click', async () => {
            const courseCode = attendanceCourseSelect.value;
            const date = attendanceDateInput.value;
            if (!date) {
                showConfirmation("Please select a date.");
                return;
            }

            const students = await api.getStudents(courseCode);
            const attendance = students.map(student => {
                const statusSelect = document.getElementById(`status-${student.id}`);
                return {
                    id: student.id,
                    name: student.name,
                    status: statusSelect.value
                };
            });

            const response = await api.saveAttendance(courseCode, date, attendance);
            showConfirmation(response.message + `\n${JSON.stringify(attendance, null, 2)}`);
        });
    }
});
