const Student = require('../models/Student');
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing

const {
    validateNameAndPhone,
    validateDob,
    validateClass,
} = require('./validation');

// Register a new user
const registerUser = async (req, res) => {
    const { username, password, profilePhoto, phone, dob, studentClass, name } = req.body;

    // Validate inputs
    const namePhoneValidation = validateNameAndPhone(username, phone);
    if (!namePhoneValidation.isValid) {
        return res.status(400).json({ message: namePhoneValidation.message });
    }

    const dobValidation = validateDob(dob);
    if (!dobValidation.isValid) {
        return res.status(400).json({ message: dobValidation.message });
    }

    const classValidation = validateClass(studentClass);
    if (!classValidation.isValid) {
        return res.status(400).json({ message: classValidation.message });
    }

    try {
        // Check if user already exists
        const existingUser = await Student.findOne({ username });
        if (existingUser) {
            return res.status(409).json({ message: "User with this username already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new Student({
            username,
            password: hashedPassword, // Save the hashed password
            profilePhoto,
            phone,
            dob: new Date(dob),
            studentClass,
            name,
        });

        await newUser.save();

        res.status(201).json({ message: "User registered successfully", user: newUser });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Login user
const loginUser = async (req, res) => {
    const { username, password } = req.body;
    console.log(username,password);
    
    try {
        const user = await Student.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        // Verify password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        // Generate a JWT token
        const token = user.username
        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all users (excluding password)
const getUsers = async (req, res) => {
    try {
        const users = await Student.find({}, { password: 0 }); // Exclude passwords from the result
        if (users.length === 0) {
            return res.status(204).json({ message: "No users found" });
        }
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update user by ID
const updateUser = async (req, res) => {
    const { id } = req.params;
    const { username, password, profilePhoto, phone, dob, studentClass, name } = req.body;

    // Validation checks
    if (username && typeof username !== 'string') {
        return res.status(400).json({ message: "Invalid username. It should be a string." });
    }

    if (password && (typeof password !== 'string' || password.length < 6)) {
        return res.status(400).json({ message: "Invalid password. It should be at least 6 characters long." });
    }

    if (phone && (!/^\d{10}$/.test(phone))) {
        return res.status(400).json({ message: "Invalid phone number. It should be a 10-digit number." });
    }

    if (dob && isNaN(new Date(dob).getTime())) {
        return res.status(400).json({ message: "Invalid date of birth. Please provide a valid date." });
    }

    if (studentClass && typeof studentClass !== 'string') {
        return res.status(400).json({ message: "Invalid class. It should be a string." });
    }

    if (name && typeof name !== 'string') {
        return res.status(400).json({ message: "Invalid name. It should be a string." });
    }

    try {
        const updateData = {};
        if (username) updateData.username = username;
        if (password) updateData.password = await bcrypt.hash(password, 10); // Hash new password if provided
        if (profilePhoto) updateData.profilePhoto = profilePhoto;
        if (phone) updateData.phone = phone;
        if (dob) updateData.dob = new Date(dob);
        if (studentClass) updateData.studentClass = studentClass;
        if (name) updateData.name = name;

        const updatedUser = await Student.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete user by ID
const deleteUser = async (req, res) => {
    try {
        const deletedUser = await Student.findByIdAndDelete(req.params.id);
        if (!deletedUser) return res.status(404).json({ message: 'User not found' });
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    registerUser,
    loginUser,
    getUsers,
    updateUser,
    deleteUser,
};
