const sequelize = require('../config/database');
const Student = require('./student');
const User = require('./user');

// export models and sequelize for easy import
module.exports = {
    sequelize,
    Student,
    User
};
