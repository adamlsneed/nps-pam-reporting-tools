import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { router as reportRoutes } from './routes/reports.js';
import { router as dashboardRoutes } from './routes/dashboard.js';
import { router as healthRoutes } from './routes/health.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());

// Request logging
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} | ${req.method} ${req.path}`);
    next();
});

// Routes
app.use('/api/health', healthRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/reports', reportRoutes);

// Root endpoint
app.get('/api', (req, res) => {
    res.json({
        name: 'NPS PAM Reporting API',
        version: '1.0.0',
        status: 'running',
        endpoints: {
            health: '/api/health',
            dashboard: '/api/dashboard',
            reports: '/api/reports'
        }
    });
});

// Error handling
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({
        error: 'Internal server error',
        message: err.message
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Not found' });
});

// Start server
app.listen(PORT, () => {
    console.log(`
╔══════════════════════════════════════════════════════════════╗
║           NPS PAM Reporting API Server Started               ║
╠══════════════════════════════════════════════════════════════╣
║  Port: ${PORT}                                                   ║
║  URL:  http://localhost:${PORT}/api                             ║
╚══════════════════════════════════════════════════════════════╝
  `);
});
