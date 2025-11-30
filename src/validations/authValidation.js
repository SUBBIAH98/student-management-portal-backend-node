const Joi = require('joi');

/**
 * Joi schema for login validation
 */
const loginSchema = Joi.object({
    username: Joi.string().min(3).max(100).required().messages({
        'string.empty': 'Username is required',
        'string.min': 'Username must be at least 3 characters long',
        'any.required': 'Username is required'
    }),
    password: Joi.string().min(6).max(255).required().messages({
        'string.empty': 'Password is required',
        'string.min': 'Password must be at least 6 characters long',
        'any.required': 'Password is required'
    }),
    role: Joi.string().valid('admin', 'staff').required().messages({
        'any.only': 'Role must be either admin or staff',
        'string.empty': 'Role is required',
        'any.required': 'Role is required'
    })
});

/**
 * Middleware for validating login body
 */
const validateLogin = (req, res, next) => {
    const { error } = loginSchema.validate(req.body, { abortEarly: false });

    if (error) {
        const errors = error.details.map(detail => ({
            field: detail.path[0],
            message: detail.message
        }));
        return res.status(400).json({ errors });
    }

    next();
};

module.exports = { validateLogin };
