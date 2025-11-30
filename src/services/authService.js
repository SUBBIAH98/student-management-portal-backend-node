const {
    createUser,
    findOneUser,
    findAndUpdateUser,
    deleteUser
} = require('../models/user');
const bcrypt = require('bcryptjs');

/**
 * Login user by username
 */
async function loginUser({ username, password }) {
    const user = await findOneUser({ username });
    console.log('user', user);
    if (!user) return null;

    // const isMatch = await bcrypt.compare(password, user.password);
    const isMatch = password === user.password;
    if (!isMatch) return null;

    return user;
}

/**
 * Create a new user (admin/staff)
 */
async function registerUser(data) {
    return createUser(data); // password hashing is already handled in model
}

/**
 * Find user by username
 */
async function getUserByUsername(username) {
    return findOneUser({ username });
}

/**
 * Find user by ID
 */
async function getUserById(id) {
    return findOneUser({ id });
}

/**
 * Update user by filters
 */
async function updateUser(filters, updates) {
    return findAndUpdateUser(filters, updates); // password hashing handled in model
}

/**
 * Delete user
 */
async function removeUser(filters) {
    return deleteUser(filters);
}

module.exports = {
    loginUser,
    registerUser,
    getUserByUsername,
    getUserById,
    updateUser,
    removeUser
};
