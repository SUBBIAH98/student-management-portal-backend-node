const Joi = require('joi');

/**
 * Joi schema for course validation
 */
const courseSchema = Joi.object({
    course_name: Joi.string().min(3).max(100).required().messages({
        'string.empty': 'Course name is required',
        'string.min': 'Course name must be at least 3 characters long',
        'string.max': 'Course name must be less than 100 characters long',
        'any.required': 'Course name is required'
    })
});

/**
 * Middleware for validating course request body
 */
const validateCourse = (req, res, next) => {
    const { error } = courseSchema.validate(req.body, { abortEarly: false });

    if (error) {
        const errors = error.details.map(detail => ({
            field: detail.path[0],
            message: detail.message
        }));
        return res.status(400).json({ errors });
    }

    next();
};

module.exports = { validateCourse };
