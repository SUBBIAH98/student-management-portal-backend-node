const Joi = require('joi');

/**
 * Schema for CREATE or FULL UPDATE (PUT)
 * -> Required fields
 */
const studentCreateOrPutSchema = Joi.object({
    first_name: Joi.string().trim().min(1).max(100).required(),
    last_name: Joi.string().trim().max(100).allow('', null),
    email: Joi.string().email().required(),
    dob: Joi.date().iso().allow(null),
    gender: Joi.string().valid('male', 'female', 'other').allow(null),
    address: Joi.string().allow('', null),
    profile_image: Joi.string().allow('', null)
});

/**
 * Schema for PARTIAL UPDATE (PATCH)
 * -> All fields optional
 */
const studentPatchSchema = Joi.object({
    first_name: Joi.string().trim().min(1).max(100).optional(),
    last_name: Joi.string().trim().max(100).allow('', null).optional(),
    email: Joi.string().email().optional(),
    dob: Joi.date().iso().allow(null).optional(),
    gender: Joi.string().valid('male', 'female', 'other').allow(null).optional(),
    address: Joi.string().allow('', null).optional(),
    profile_image: Joi.string().allow('', null).optional()
}).min(1); // ensure at least one field is updated

/**
 * Middleware to validate using correct schema
 */
function validateStudent(schema) {
    return (req, res, next) => {
        const data = { ...req.body };

        if (req.file) {
            data.profile_image = req.file.filename;
        }

        const { error } = schema.validate(data, { abortEarly: false });

        if (error) {
            const errors = error.details.map(d => ({
                field: d.path[0],
                message: d.message
            }));
            return res.status(400).json({ errors });
        }

        next();
    };
}

module.exports = {
    validateStudentCreateOrPut: validateStudent(studentCreateOrPutSchema),
    validateStudentPatch: validateStudent(studentPatchSchema)
};
