    const { Student } = require('../models/student');
    const { Course } = require('../models/course');
    const { User } = require('../models/user');
    const { Op, fn, col } = require('sequelize');

    class DashboardService {
        async getDashboardSummary() {
            try {
                // Total counts
                const totalStudents = await Student.count();
                const totalCourses = await Course.count();

                // Gender counts
                const maleStudents = await Student.count({ where: { gender: 'male' } });
                const femaleStudents = await Student.count({ where: { gender: 'female' } });

                // Recent 5 students
                const recentStudents = await Student.findAll({
                    limit: 5,
                    order: [['createdAt', 'DESC']],
                    include: [
                        {
                            model: Course,
                            as: 'course',
                            attributes: ['course_name']
                        }
                    ],
                    attributes: ['id', 'first_name', 'last_name', 'email', 'createdAt']
                });

                // Top courses by student count
                const topCourses = await Student.findAll({
                    attributes: [
                        'course_id',
                        [fn('COUNT', col('Student.course_id')), 'count']
                    ],
                    include: [
                        {
                            model: Course,
                            as: 'course',   // THIS alias must be used everywhere
                            attributes: ['course_name']
                        }
                    ],
                    group: [
                        'Student.course_id',
                        'course.course_id',
                        'course.course_name'   // FIXED (NOT Course.course_name)
                    ],
                    order: [[fn('COUNT', col('Student.course_id')), 'DESC']],
                    limit: 5
                });


                const topCoursesFormatted = topCourses.map(item => ({
                    course_name: item.Course ? item.Course.course_name : null,
                    count: item.get('count')
                }));

                return {
                    totalStudents,
                    totalCourses,
                    maleStudents,
                    femaleStudents,
                    recentStudents,
                    topCourses: topCoursesFormatted
                };
            } catch (error) {
                console.error('Error generating dashboard summary:', error);
                throw new Error(error.message);
            }
        }
    };

    module.exports = DashboardService;
