const CourseService = require('../services/courseService');
const courseService = new CourseService();

module.exports = {
    // CREATE a new course
    createCourse: async (req, res) => {
        try {
            const created = await courseService.createCourseData(req.body);
            res.status(201).json({ data: created });
        } catch (error) {
            console.error('Error creating course:', error);
            res.status(400).json({ message: error.message });
        }
    },

    // GET all courses with pagination and search
    listCourses: async (req, res) => {
        try {
            const { page, limit, search } = req.query;
            const result = await courseService.getAllCourses({ page, limit, search });
            res.status(200).json(result);
        } catch (error) {
            console.error('Error fetching courses:', error);
            res.status(400).json({ message: error.message });
        }
    },

    // GET a single course by ID
    getCourse: async (req, res) => {
        try {
            const id = req.params.id;
            const course = await courseService.getCourseById(id);
            if (!course) return res.status(404).json({ message: 'Course not found' });
            res.status(200).json({ data: course });
        } catch (error) {
            console.error('Error fetching course:', error);
            res.status(400).json({ message: error.message });
        }
    },

    // UPDATE course by ID
    updateCourse: async (req, res) => {
        try {
            const id = req.params.id;
            const updated = await courseService.updateCourse(id, req.body);
            if (!updated) return res.status(404).json({ message: 'Course not found' });
            res.status(200).json({ data: updated });
        } catch (error) {
            console.error('Error updating course:', error);
            res.status(400).json({ message: error.message });
        }
    },

    // DELETE course by ID
    removeCourse: async (req, res) => {
        try {
            const id = req.params.id;
            const deleted = await courseService.deleteCourse(id);
            if (!deleted) return res.status(404).json({ message: 'Course not found' });
            res.status(200).json({ message: 'Deleted successfully' });
        } catch (error) {
            console.error('Error deleting course:', error);
            res.status(400).json({ message: error.message });
        }
    }
};
