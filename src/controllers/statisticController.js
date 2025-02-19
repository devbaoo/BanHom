const statisticService = require('../services/statisticService');

const getPageViewStats = async (req, res) => {
    try {
        const stats = await statisticService.getPageViewStats();
        return res.status(200).json({
            errCode: 0,
            data: stats
        });
    } catch (error) {
        console.error('Statistics controller error:', error);
        return res.status(500).json({
            errCode: 1,
            message: 'Internal server error'
        });
    }
};

module.exports = {
    getPageViewStats
};

