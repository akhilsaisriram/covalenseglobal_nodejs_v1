const express = require('express');
const {
    registerUser,
    loginUser,
    getUsers,
    updateUser,
    deleteUser,
} = require('../controllers/studentController');

const router = express.Router();

// User registration route
router.post('/register', registerUser);

// User login route
router.post('/login', loginUser);

// Get all users 
router.get('/', getUsers);

// Update user by ID
router.put('/:id', updateUser);

// Delete user by ID
router.delete('/:id', deleteUser);


module.exports = router;
