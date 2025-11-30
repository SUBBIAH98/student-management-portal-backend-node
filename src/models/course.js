const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Course = sequelize.define("Course", {
    course_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    course_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true
    }
}, {
    tableName: 'courses',
    timestamps: true
});


// Create a new student
const createCourse = (values) => Course.create(values);

// Find all students with optional filters
const findAllCourses = (dynamicFields = {}) => Course.findAll({
    where: dynamicFields,
    order: [['course_id', 'DESC']]
});

// Find a single Course
const findOneCourse = (dynamicFields) => Course.findOne({ where: dynamicFields });

// Update a Course
const findAndUpdateCourse = (filter, updateValues) => Course.update(updateValues, { where: filter });

// Delete a Course
const deleteCourse = (dynamicFields) => Course.destroy({ where: dynamicFields });

// Export
module.exports = {
    Course,
    createCourse,
    findAllCourses,
    findOneCourse,
    findAndUpdateCourse,
    deleteCourse
};

