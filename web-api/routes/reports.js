import express from 'express';
import { PowerShellService } from '../services/powershell.js';

export const router = express.Router();
const ps = new PowerShellService();

// List available reports
router.get('/', (req, res) => {
    res.json({
        reports: [
            {
                id: 'credential-rotation',
                name: 'Credential Rotation Report',
                description: 'Password rotation compliance and credential lifecycle',
                endpoint: '/api/reports/credentials'
            },
            {
                id: 'dependencies',
                name: 'Service Account Dependencies',
                description: 'Service account dependency mapping and impact analysis',
                endpoint: '/api/reports/dependencies'
            },
            {
                id: 'user-activity',
                name: 'Privileged User Activity',
                description: 'User behavior analysis and risk scoring',
                endpoint: '/api/reports/activity'
            }
        ]
    });
});

// Credential Rotation Report
router.get('/credentials', async (req, res) => {
    try {
        const { threshold = 90, includeDormant = false } = req.query;
        const data = await ps.getCredentialRotationReport({
            threshold: parseInt(threshold),
            includeDormant: includeDormant === 'true'
        });
        res.json(data);
    } catch (error) {
        console.error('Credential report error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Service Account Dependencies
router.get('/dependencies', async (req, res) => {
    try {
        const { showImpact = false } = req.query;
        const data = await ps.getDependencyReport({
            showImpact: showImpact === 'true'
        });
        res.json(data);
    } catch (error) {
        console.error('Dependency report error:', error);
        res.status(500).json({ error: error.message });
    }
});

// User Activity Report
router.get('/activity', async (req, res) => {
    try {
        const { days = 30, includeBehavioral = false, user } = req.query;
        const data = await ps.getUserActivityReport({
            days: parseInt(days),
            includeBehavioral: includeBehavioral === 'true',
            userFilter: user
        });
        res.json(data);
    } catch (error) {
        console.error('Activity report error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Export report in specific format
router.get('/export/:reportType', async (req, res) => {
    try {
        const { reportType } = req.params;
        const { format = 'json' } = req.query;

        let data;
        switch (reportType) {
            case 'credentials':
                data = await ps.getCredentialRotationReport({});
                break;
            case 'dependencies':
                data = await ps.getDependencyReport({});
                break;
            case 'activity':
                data = await ps.getUserActivityReport({});
                break;
            default:
                return res.status(400).json({ error: 'Invalid report type' });
        }

        if (format === 'csv') {
            res.setHeader('Content-Type', 'text/csv');
            res.setHeader('Content-Disposition', `attachment; filename=${reportType}-report.csv`);
            // Convert to CSV (simplified)
            const csv = convertToCSV(data);
            res.send(csv);
        } else {
            res.json(data);
        }
    } catch (error) {
        console.error('Export error:', error);
        res.status(500).json({ error: error.message });
    }
});

function convertToCSV(data) {
    if (!data || !data.data || !Array.isArray(data.data)) {
        return '';
    }

    const items = data.data;
    if (items.length === 0) return '';

    const headers = Object.keys(items[0]);
    const rows = items.map(item =>
        headers.map(header => JSON.stringify(item[header] || '')).join(',')
    );

    return [headers.join(','), ...rows].join('\n');
}
