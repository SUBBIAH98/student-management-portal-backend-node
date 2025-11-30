const { sequelize, Student } = require('../models');

async function seed() {
    try {
        await sequelize.sync(); // safe default: create tables if not exist
        await Student.bulkCreate([
            { first_name: 'Alice', last_name: 'Smith', email: 'alice@example.com', dob: '2003-05-12', gender: 'female' },
            { first_name: 'Bob', last_name: 'Johnson', email: 'bob@example.com', dob: '2002-10-30', gender: 'male' }
        ], { ignoreDuplicates: true });
        console.log('Seed done');
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

seed();
