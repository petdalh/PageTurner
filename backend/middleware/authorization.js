const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

const userAccess = asyncHandler(async (req, res, next) => {
    if (req.user.role === 'user' || req.user.role === 'admin') {
        // Authorized
        next()
    } else {
        // Not authorized
        res.status(403).json({ message: 'You are not authorized to do this action' });
    }
});

module.exports = { userAccess }