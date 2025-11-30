const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");  // This is your Sequelize instance (from config/database.js) that connects to your DB
const { Course } = require("./course");

// Define Student model
const Student = sequelize.define('Student', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    first_name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
        validate: { isEmail: true }
    },
    dob: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    gender: {
        type: DataTypes.ENUM('male', 'female', 'other'),
        allowNull: true
    },
    address: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    profile_image: { type: DataTypes.STRING(255), allowNull: true },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    course_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Course,
            key: "course_id"
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL"
    }
}, {
    tableName: 'students',
    timestamps: true,
    indexes: [
        {
            unique: true,
            fields: ['email'] // define once instead of re-creating multiple times
        }
    ]
});

// ------------------- CRUD Helper Functions -------------------

// Create a new student
const createStudent = (values) => Student.create(values);

// Find all students with optional filters
const findAllStudents = (dynamicFields = {}) => Student.findAll({
    where: dynamicFields,
    order: [['id', 'DESC']]
});

// Find a single student
const findOneStudent = (dynamicFields) => Student.findOne({ where: dynamicFields });

// Update a student
const findAndUpdateStudent = (filter, updateValues) => Student.update(updateValues, { where: filter });

// Delete a student
const deleteStudent = (dynamicFields) => Student.destroy({ where: dynamicFields });


Course.hasMany(Student, { foreignKey: "course_id", as: "students" });
Student.belongsTo(Course, { foreignKey: "course_id", as: "course" });

// Export
module.exports = {
    Student,
    createStudent,
    findAllStudents,
    findOneStudent,
    findAndUpdateStudent,
    deleteStudent
};
