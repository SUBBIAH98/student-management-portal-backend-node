const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const { validateStudentCreateOrPut, validateStudentPatch } = require('../validations/studentValidation');
const { authenticateToken, authorizedRoles } = require('../middleware/authMiddleware');
const { optionalUpload } = require('../config/upload')

// Create a new student (Admin only)
router.post('/', authenticateToken, authorizedRoles('admin'), optionalUpload('profile_image'), validateStudentCreateOrPut, studentController.createStudent);

// List all students (Admin & Staff)
router.get('/', authenticateToken, authorizedRoles('admin','staff'), studentController.listStudents);

// Get a single student by ID (Admin & Staff)
router.get('/:id', authenticateToken, authorizedRoles('admin','staff'), studentController.getStudent);

// Update a student (Admin only)
router.put('/:id', authenticateToken, authorizedRoles('admin'), optionalUpload('profile_image'), validateStudentCreateOrPut, studentController.updateStudent);

router.patch('/:id', authenticateToken, authorizedRoles('admin'), optionalUpload('profile_image'), validateStudentPatch, studentController.updateStudent);

// Delete a student (Admin only)
router.delete('/:id', authenticateToken, authorizedRoles('admin'), studentController.removeStudent);

module.exports = router;
