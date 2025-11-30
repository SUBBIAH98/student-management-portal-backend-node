const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const { validateCourse } = require('../validations/courseValidation');
const { authenticateToken, authorizedRoles } = require('../middleware/authMiddleware');

// Create a new student (Admin only)
router.post('/', authenticateToken, authorizedRoles('admin'), validateCourse, courseController.createCourse);

// List all students (Admin & Staff)
router.get('/', authenticateToken, authorizedRoles('admin','staff'), courseController.listCourses);

// Get a single student by ID (Admin & Staff)
router.get('/:id', authenticateToken, authorizedRoles('admin','staff'), courseController.getCourse);

// Update a student (Admin only)
router.put('/:id', authenticateToken, authorizedRoles('admin'), validateCourse, courseController.updateCourse);

// Delete a student (Admin only)
router.delete('/:id', authenticateToken, authorizedRoles('admin'), courseController.removeCourse);

module.exports = router;
