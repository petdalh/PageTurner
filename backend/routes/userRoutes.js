const express = require('express')
const router = express.Router()

const { getAllUsers, getUserById, deleteUserById, registerUser, loginUser, getMe } = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')
const { userAccess } = require('../middleware/authorization')


// Get all users
router.get('/', getAllUsers)

// Delete a user by id
router.delete('/:id', protect, userAccess, deleteUserById)

// Register a new user
router.post('/register', registerUser)

// Authenticate a user
router.post('/login', loginUser)

// Get the current user
router.get('/me', protect, getMe)

// Get a user by id
router.get('/:id', getUserById)

// router.use((err, req, res, next) => {
//     console.error(err.stack);
//     res.status(500).json({ message: 'Internal server error' });
// });

router.use((err, req, res, next) => {
    console.error(err.stack);
    const statusCode = err.status || 500;
    const errorMessage = err.message || 'Internal server error';
    res.status(statusCode).json({ message: errorMessage });
});
module.exports = router