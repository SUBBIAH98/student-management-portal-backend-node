const { Course, findOneCourse, findAndUpdateCourse, createCourse, deleteCourse } = require('../models/course');
const { Op } = require('sequelize');
const _ = require('lodash');

module.exports = class CourseService {

    async createCourseData(data) {
        try {
            return await createCourse(data);
        } catch (error) {
            console.error('Error creating student:', error);
            throw new Error(error.message);
        }
    }

    async getAllCourses({ page = 1, limit = 10, search } = {}) {
        try {
            const offset = (Number(page) - 1) * Number(limit);
            const where = {};

            if (search) {
                where.course_name = {[Op.like] : `%${search}%`};
            }

            const { count, rows } = await Course.findAndCountAll({
                where,
                limit: Number(limit),
                offset,
                order: [['course_id', 'DESC']]
            });

            return { total: count, page: Number(page), limit: Number(limit), data: rows };
        } catch (error) {
            console.error('Error fetching students:', error);
            throw new Error(error.message);
        }
    }

    async getCourseById(id) {
        try {
            return await findOneCourse({ course_id: id });
        } catch (error) {
            console.error('Error fetching student by ID:', error);
            throw new Error(error.message);
        }
    }

    async updateCourse(id, updates) {
        try {
            const student = await findOneCourse({ course_id: id });
            if (!student) return null;
            await findAndUpdateCourse({ course_id: id }, updates);
            return await findOneCourse({ course_id: id });
        } catch (error) {
            console.error('Error updating student:', error);
            throw new Error(error.message);
        }
    }

    async deleteCourse(id) {
        try {
            const student = await findOneCourse({ course_id: id });
            if (!student) return false;
            await deleteCourse({ course_id: id });
            return true;
        } catch (error) {
            console.error('Error deleting student:', error);
            throw new Error(error.message);
        }
    }
};
