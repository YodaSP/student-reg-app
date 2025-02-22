const express = require("express");
const fs = require("fs");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const STUDENT_DATA_FILE = "students.json";

// Load student data from JSON file
const loadStudentData = () => {
    if (fs.existsSync(STUDENT_DATA_FILE)) {
        return JSON.parse(fs.readFileSync(STUDENT_DATA_FILE, "utf-8"));
    }
    return [];
};

// Save student data to JSON file
const saveStudentData = (data) => {
    fs.writeFileSync(STUDENT_DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
};

// Register Student (Append Data)
app.post("/api/register", (req, res) => {
    const { astraeaID, name, city, college } = req.body;
    if (!astraeaID || !name || !city || !college) {
        return res.status(400).json({ message: "All fields are required" });
    }

    let students = loadStudentData();
    students.push({ astraeaID, name, city, college });
    saveStudentData(students);

    res.json({ message: "Student Registered Successfully!" });
});

// Fetch All Students (Admin Access)
app.get("/api/students", (req, res) => {
    const students = loadStudentData();
    res.json(students);
});

const PORT = 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
