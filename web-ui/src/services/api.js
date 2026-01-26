import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance with defaults
const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Request interceptor
api.interceptors.request.use(
    (config) => {
        // Add auth token if available
        const token = localStorage.getItem('auth_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
api.interceptors.response.use(
    (response) => response.data,
    (error) => {
        console.error('API Error:', error.response?.data || error.message);

        // Handle specific error codes
        if (error.response?.status === 401) {
            // Handle unauthorized
            localStorage.removeItem('auth_token');
            window.location.href = '/login';
        }

        return Promise.reject(error);
    }
);

// API Functions
export const apiService = {
    // Health check
    health: () => api.get('/health'),
    npsStatus: () => api.get('/health/nps'),

    // Dashboard
    getDashboard: () => api.get('/dashboard'),
    getMetrics: () => api.get('/dashboard/metrics'),
    getCompliance: () => api.get('/dashboard/compliance'),
    getAlerts: () => api.get('/dashboard/alerts'),

    // Reports
    getReportsList: () => api.get('/reports'),

    getCredentialReport: (params = {}) =>
        api.get('/reports/credentials', { params }),

    getDependencyReport: (params = {}) =>
        api.get('/reports/dependencies', { params }),

    getActivityReport: (params = {}) =>
        api.get('/reports/activity', { params }),

    exportReport: (reportType, format = 'json') =>
        api.get(`/reports/export/${reportType}`, {
            params: { format },
            responseType: format === 'csv' ? 'blob' : 'json'
        })
};

export default apiService;
