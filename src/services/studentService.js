const { Student, findOneStudent, findAndUpdateStudent, createStudent, deleteStudent } = require('../models/student');
const { Op } = require('sequelize');
const _ = require('lodash');

module.exports = class StudentService {

    async createStudentData(data) {
        try {
            return await createStudent(data);
        } catch (error) {
            console.error('Error creating student:', error);
            throw new Error(error.message);
        }
    }

    async getAllStudents({ page = 1, limit = 10, search } = {}) {
        try {
            const offset = (Number(page) - 1) * Number(limit);
            const where = {};

            if (search) {
                where[Op.or] = [
                    { first_name: { [Op.like]: `%${search}%` } },
                    { last_name: { [Op.like]: `%${search}%` } },
                    { email: { [Op.like]: `%${search}%` } }
                ];
            }

            const { count, rows } = await Student.findAndCountAll({
                where,
                limit: Number(limit),
                offset,
                order: [['id', 'DESC']]
            });

            return { total: count, page: Number(page), limit: Number(limit), data: rows };
        } catch (error) {
            console.error('Error fetching students:', error);
            throw new Error(error.message);
        }
    }

    async getStudentById(id) {
        try {
            return await findOneStudent({ id });
        } catch (error) {
            console.error('Error fetching student by ID:', error);
            throw new Error(error.message);
        }
    }

    async updateStudent(id, updates) {
        try {
            const student = await findOneStudent({ id });
            if (!student) return null;
            await findAndUpdateStudent({ id }, updates);
            return await findOneStudent({ id });
        } catch (error) {
            console.error('Error updating student:', error);
            throw new Error(error.message);
        }
    }

    async deleteStudent(id) {
        try {
            const student = await findOneStudent({ id });
            if (!student) return false;
            await deleteStudent({ id });
            return true;
        } catch (error) {
            console.error('Error deleting student:', error);
            throw new Error(error.message);
        }
    }
};
