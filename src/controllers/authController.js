const jwt = require('jsonwebtoken');
const authServices = require('../services/authService');

/**
 * Generate JWT token
 */
const generateToken = (user) => {
    return jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
    );
};

/**
 * Login controller
 */
const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await authServices.loginUser({ username, password });

        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const token = generateToken(user);

        res.json({
            message: 'Login successful',
            token,
            user: {
                id: user.id,
                username: user.username,
                role: user.role
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { login };
