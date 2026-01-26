import express from 'express';
import { PowerShellService } from '../services/powershell.js';

export const router = express.Router();
const ps = new PowerShellService();

// Get dashboard data
router.get('/', async (req, res) => {
    try {
        const data = await ps.getDashboardData();
        res.json(data);
    } catch (error) {
        console.error('Dashboard error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Get summary metrics
router.get('/metrics', async (req, res) => {
    try {
        const metrics = await ps.getMetrics();
        res.json(metrics);
    } catch (error) {
        console.error('Metrics error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Get compliance status
router.get('/compliance', async (req, res) => {
    try {
        const compliance = await ps.getComplianceStatus();
        res.json(compliance);
    } catch (error) {
        console.error('Compliance error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Get security alerts
router.get('/alerts', async (req, res) => {
    try {
        const alerts = await ps.getSecurityAlerts();
        res.json(alerts);
    } catch (error) {
        console.error('Alerts error:', error);
        res.status(500).json({ error: error.message });
    }
});
