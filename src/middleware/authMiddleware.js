const jwt = require('jsonwebtoken');

/**
 * Verify JWT token
 */
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });
        req.user = user; // contains id and role
        next();
    });
};

/**
 * Role-based authorization
 * Example: authorizedRoles('admin','staff')
 */
const authorizedRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'You do not have permission to access this resource' });
        }
        next();
    };
};

module.exports = {
    authenticateToken,
    authorizedRoles
};
