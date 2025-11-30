const StudentService = require('../services/studentService');
const studentService = new StudentService(); // create instance of your service

module.exports = {
    // CREATE a new student
    createStudent: async (req, res) => {
        try {
            const created = await studentService.createStudentData(req.body);
            res.status(201).json({ data: created });
        } catch (error) {
            console.error('Error creating student:', error);
            res.status(400).json({ message: error.message });
        }
    },

    // GET all students with pagination and search
    listStudents: async (req, res) => {
        try {
            const { page, limit, search } = req.query;
            const result = await studentService.getAllStudents({ page, limit, search });
            res.status(200).json(result);
        } catch (error) {
            console.error('Error fetching students:', error);
            res.status(400).json({ message: error.message });
        }
    },

    // GET a single student by ID
    getStudent: async (req, res) => {
        try {
            const id = req.params.id;
            const student = await studentService.getStudentById(id);
            if (!student) return res.status(404).json({ message: 'Student not found' });
            res.status(200).json({ data: student });
        } catch (error) {
            console.error('Error fetching student:', error);
            res.status(400).json({ message: error.message });
        }
    },

    // UPDATE student by ID
    updateStudent: async (req, res) => {
        try {
            const id = req.params.id;
            const updated = await studentService.updateStudent(id, req.body);
            if (!updated) return res.status(404).json({ message: 'Student not found' });
            res.status(200).json({ data: updated });
        } catch (error) {
            console.error('Error updating student:', error);
            res.status(400).json({ message: error.message });
        }
    },

    // DELETE student by ID
    removeStudent: async (req, res) => {
        try {
            const id = req.params.id;
            const deleted = await studentService.deleteStudent(id);
            if (!deleted) return res.status(404).json({ message: 'Student not found' });
            res.status(200).json({ message: 'Deleted successfully' });
        } catch (error) {
            console.error('Error deleting student:', error);
            res.status(400).json({ message: error.message });
        }
    }
};
