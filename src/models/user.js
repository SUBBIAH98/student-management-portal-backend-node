const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const bcrypt = require("bcryptjs");
const { Course } = require("./course");

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM('admin', 'staff'),
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
    tableName: 'users',
    timestamps: true
});

// 🔒 Hash password before saving
// User.beforeCreate(async (user) => {
//   if (user.password) {
//     const salt = await bcrypt.genSalt(10);
//     user.password = await bcrypt.hash(user.password, salt);
//   }
// });

// User.beforeUpdate(async (user) => {
//   if (user.changed("password")) {
//     const salt = await bcrypt.genSalt(10);
//     user.password = await bcrypt.hash(user.password, salt);
//   }
// });

const createUser = async (values) => {
    if (values.password) {
        const salt = await bcrypt.salt(10);
        values.password = await bcrypt.hash(values.password, salt);
    }
    return User.create(values);
}

const findAllUser = async (filters = {}) => {
    return User.findAll({
        where: filters,
        order: [['id', 'DESC']]
    })
}

const findOneUser = async (filters) => {
    return User.findOne({
        where: filters
    })
}

const findAndUpdateUser = async (filters, updatedValue) => {
    if (updatedValue.password) {
        const salt = await bcrypt.genSalt(10);
        updatedValue.password = await bcrypt.hash(updatedValue.password, salt);
    }
    // const [rowsUpdated] = await User.update(updatedValue, { where: filters });
    // if (rowsUpdated === 0) return null;
    // return User.findOne({ where: filters});
    return User.update(updatedValue, { where: filters });
}

const deleteUser = async (dynamicField) => {
    return User.destroy({ where: dynamicField });
}

// ------------------- One-to-One Association -------------------

// One-to-One between Course and Staff
Course.hasOne(User, { foreignKey: "course_id", as: "staff" });
User.belongsTo(Course, { foreignKey: "course_id", as: "course" });

module.exports = {
    User,
    createUser,
    findAllUser,
    findOneUser,
    findAndUpdateUser,
    deleteUser
};