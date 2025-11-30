const DashboardService = require('../services/dashboardService');
const dashboardService = new DashboardService();

const getDashboardSummary = async (req, res) => {
    try {
        const data = await dashboardService.getDashboardSummary();
        res.json(data);
    } catch (error) {
        console.error('Dashboard Error:', error);
        res.status(500).json({ message: 'Failed to fetch dashboard data' });
    }
};

module.exports = { getDashboardSummary };
