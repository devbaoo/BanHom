const db = require('../models');
const UAParser = require('ua-parser-js');


const trackPageView = async (req, res, next) => {
    try {
        // Bỏ qua các request không phải GET hoặc các route admin
        if (req.method !== 'GET' || req.path.startsWith('/admin')) {
            return next();
        }

        const parser = new UAParser(req.headers['user-agent']);
        const userAgent = parser.getResult();

        await db.PageView.create({
            page: req.path,
            ipAddress: req.ip,
            deviceType: userAgent.device.type || 'desktop',
            browser: userAgent.browser.name,
            referrer: req.headers.referer || ''
        });

    } catch (error) {
        console.error('Page view tracking error:', error);
    }
    next();
};

module.exports = trackPageView;