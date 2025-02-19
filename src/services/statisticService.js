const db = require('../models');
const { Op } = require('sequelize');
const moment = require('moment');


const getPageViewStats = async () => {
    try {
        const today = moment().startOf('day');
        const lastMonth = moment().subtract(1, 'month').startOf('day');

        // Thống kê theo ngày trong 30 ngày gần nhất
        const dailyStats = await db.PageView.findAll({
            attributes: [
                [db.sequelize.fn('DATE', db.sequelize.col('accessTime')), 'date'],
                [db.sequelize.fn('COUNT', '*'), 'viewCount'],
                [db.sequelize.fn('COUNT', db.sequelize.fn('DISTINCT', db.sequelize.col('ipAddress'))), 'uniqueVisitors']
            ],
            where: {
                accessTime: {
                    [Op.between]: [lastMonth.toDate(), today.endOf('day').toDate()]
                }
            },
            group: [db.sequelize.fn('DATE', db.sequelize.col('accessTime'))],
            order: [[db.sequelize.fn('DATE', db.sequelize.col('accessTime')), 'DESC']]
        });

        // Thống kê theo trang
        const pageStats = await db.PageView.findAll({
            attributes: [
                'page',
                [db.sequelize.fn('COUNT', '*'), 'viewCount']
            ],
            where: {
                accessTime: {
                    [Op.between]: [lastMonth.toDate(), today.endOf('day').toDate()]
                }
            },
            group: ['page'],
            order: [[db.sequelize.fn('COUNT', '*'), 'DESC']]
        });

        // Thống kê theo thiết bị
        const deviceStats = await db.PageView.findAll({
            attributes: [
                'deviceType',
                [db.sequelize.fn('COUNT', '*'), 'count']
            ],
            where: {
                accessTime: {
                    [Op.between]: [lastMonth.toDate(), today.endOf('day').toDate()]
                }
            },
            group: ['deviceType']
        });

        return {
            dailyStats,
            pageStats,
            deviceStats,
            summary: {
                totalViews: await db.PageView.count({
                    where: {
                        accessTime: {
                            [Op.between]: [lastMonth.toDate(), today.endOf('day').toDate()]
                        }
                    }
                }),
                uniqueVisitors: await db.PageView.count({
                    distinct: true,
                    col: 'ipAddress',
                    where: {
                        accessTime: {
                            [Op.between]: [lastMonth.toDate(), today.endOf('day').toDate()]
                        }
                    }
                })
            }
        };
    } catch (error) {
        console.error('Statistics error:', error);
        throw error;
    }
};

module.exports = {
    getPageViewStats
};