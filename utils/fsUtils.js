const fs = require("fs");
const path = require("path");

// Path to the JSON file
const filePath = path.join(__dirname, "../data/students.json");

// Read data from JSON file
const readData = () => {
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, JSON.stringify([])); // Initialize file if it doesn't exist
    }
    const data = fs.readFileSync(filePath, "utf8");
    return JSON.parse(data || "[]");
};

// Write data to JSON file
const writeData = (data) => {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

module.exports = {
    readData,
    writeData,
};
