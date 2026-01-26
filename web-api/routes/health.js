import express from 'express';

export const router = express.Router();

// Health check endpoint
router.get('/', (req, res) => {
    res.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        memory: process.memoryUsage()
    });
});

// NPS connection status
router.get('/nps', async (req, res) => {
    // In production, this would check actual NPS connection
    res.json({
        connected: true,
        server: process.env.NPS_SERVER || 'Not configured',
        lastCheck: new Date().toISOString()
    });
});
