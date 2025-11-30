const { Student } = require('../models');

async function createStudent(data) {
    return Student.create(data);
}

async function getAllStudents({page = 1, limit = 10, search } = {}) {
    console.log('getAllStudents-search', search);
    const offset = (Number(page) - 1) * Number(limit);
    const where = {};
    if (search) {
        where[Symbol.for('or')] = [
            { first_name: {[Symbol.for('like')]: `%${search}%`}},
            { last_name: {[Symbol.for('like')]: `%${search}%`}},
            { email: {[Symbol.for('like')]: `%${search}%`}}
        ];
    }
    const { count, rows } = await Student.findAndCountAll({
        where,
        limit: Number(limit),
        offset,
        order: [['id', 'ASC']]
    });
    return { total: count, page: Number(page), limit: Number(limit), data: rows }
}

async function getStudentById(id) {
    return Student.findByPk(id);
}

async function updateStudent(id, updates) {
    console.log("id", id, "updates", updates);
    const student = await Student.findByPk(id);
    if (!student) return null;
    console.log(student);
    return Student.update(updates, { where: {id}});
}

async function deleteStudent(id) {
    const student = await Student.findByPkId(id);
    if(!student) return false;
    await Student.destroy({ where: {id}});
    return true;
}

module.exports = {
    createStudent,
    getAllStudents,
    getStudentById,
    updateStudent,
    deleteStudent
}