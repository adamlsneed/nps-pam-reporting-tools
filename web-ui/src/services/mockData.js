// Mock data service for development
// This will be replaced by real API calls in production

export const mockDashboardData = {
    metrics: {
        totalResources: 245,
        totalCredentials: 187,
        activeSessions: 12,
        accessPolicies: 8,
        trends: {
            resources: 5.2,
            credentials: 3.1,
            sessions: -2.8,
            policies: 0
        }
    },

    compliance: {
        score: 83.3,
        maxScore: 100,
        checks: [
            { label: 'Auto-rotation enabled', value: '76%', passed: true },
            { label: 'Rotation compliance', value: '222/245', passed: true },
            { label: 'Access policies active', passed: true },
            { label: 'After-hours activity', value: '<10%', passed: true },
            { label: 'Failed sessions', value: '3', passed: true },
            { label: 'Dormant credentials', value: '12', passed: false }
        ]
    },

    alerts: [
        { severity: 'critical', message: 'Long-running sessions detected', count: 3, time: '5m ago' },
        { severity: 'warning', message: 'Credentials overdue for rotation', count: 23, time: '1h ago' },
        { severity: 'warning', message: 'Failed login attempts detected', count: 5, time: '2h ago' },
        { severity: 'info', message: 'Weekly compliance report ready', time: '3h ago' }
    ],

    topUsers: [
        { rank: 1, name: 'admin_smith', sessions: 42, risk: 'high' },
        { rank: 2, name: 'jdoe', sessions: 31, risk: 'medium' },
        { rank: 3, name: 'sysadmin', sessions: 28, risk: 'low' },
        { rank: 4, name: 'dbadmin', sessions: 24, risk: 'low' },
        { rank: 5, name: 'netops', sessions: 19, risk: 'low' }
    ],

    topResources: [
        { rank: 1, name: 'DC-PROD-01', sessions: 87, platform: 'Windows' },
        { rank: 2, name: 'DB-PROD', sessions: 65, platform: 'SQL Server' },
        { rank: 3, name: 'WEB-APP-01', sessions: 43, platform: 'Linux' },
        { rank: 4, name: 'JUMP-SERVER', sessions: 38, platform: 'Windows' },
        { rank: 5, name: 'FIREWALL-01', sessions: 29, platform: 'Network' }
    ],

    recentActivity: [
        { time: '10:45 AM', user: 'admin_smith', action: 'Started session', resource: 'DC-PROD-01' },
        { time: '10:42 AM', user: 'jdoe', action: 'Ended session', resource: 'DB-PROD' },
        { time: '10:38 AM', user: 'sysadmin', action: 'Password retrieved', resource: 'JUMP-SERVER' },
        { time: '10:35 AM', user: 'dbadmin', action: 'Started session', resource: 'DB-PROD' },
        { time: '10:30 AM', user: 'netops', action: 'Session approved', resource: 'FIREWALL-01' }
    ],

    sessionStats: {
        last24Hours: [
            { hour: '12 AM', sessions: 2 },
            { hour: '1 AM', sessions: 1 },
            { hour: '2 AM', sessions: 0 },
            { hour: '3 AM', sessions: 0 },
            { hour: '4 AM', sessions: 1 },
            { hour: '5 AM', sessions: 2 },
            { hour: '6 AM', sessions: 4 },
            { hour: '7 AM', sessions: 8 },
            { hour: '8 AM', sessions: 15 },
            { hour: '9 AM', sessions: 22 },
            { hour: '10 AM', sessions: 28 },
            { hour: '11 AM', sessions: 25 },
            { hour: '12 PM', sessions: 18 },
            { hour: '1 PM', sessions: 24 },
            { hour: '2 PM', sessions: 30 },
            { hour: '3 PM', sessions: 35 },
            { hour: '4 PM', sessions: 28 },
            { hour: '5 PM', sessions: 15 },
            { hour: '6 PM', sessions: 8 },
            { hour: '7 PM', sessions: 5 },
            { hour: '8 PM', sessions: 3 },
            { hour: '9 PM', sessions: 2 },
            { hour: '10 PM', sessions: 1 },
            { hour: '11 PM', sessions: 1 }
        ]
    }
}

export const mockCredentialData = {
    summary: {
        total: 245,
        overdue: 23,
        dueSoon: 45,
        ok: 177,
        dormant: 12,
        neverUsed: 5,
        complianceRate: 72.24,
        avgRotationAge: 63
    },

    credentials: [
        { id: 1, name: 'svc_backup', type: 'Service', platform: 'Windows', lastRotation: '2025-11-15', daysAgo: 71, status: 'DUE SOON', autoRotate: true },
        { id: 2, name: 'admin_db', type: 'User', platform: 'SQL Server', lastRotation: '2025-10-20', daysAgo: 97, status: 'OVERDUE', autoRotate: false },
        { id: 3, name: 'svc_monitor', type: 'Service', platform: 'Linux', lastRotation: '2025-12-01', daysAgo: 55, status: 'OK', autoRotate: true },
        { id: 4, name: 'root_backup', type: 'User', platform: 'Linux', lastRotation: '2025-09-15', daysAgo: 132, status: 'OVERDUE', autoRotate: false },
        { id: 5, name: 'svc_web', type: 'Application', platform: 'IIS', lastRotation: '2025-12-20', daysAgo: 36, status: 'OK', autoRotate: true }
    ]
}

export const mockDependencyData = {
    summary: {
        total: 47,
        critical: 8,
        high: 12,
        medium: 15,
        low: 12
    },

    serviceAccounts: [
        {
            id: 1,
            name: 'svc_backup',
            domain: 'CORP',
            criticality: 'CRITICAL',
            dependencies: 15,
            lastRotation: 45,
            autoRotate: false,
            systems: ['SERVER01', 'SERVER02', 'BACKUP01', 'DC-01']
        },
        {
            id: 2,
            name: 'svc_sql',
            domain: 'CORP',
            criticality: 'CRITICAL',
            dependencies: 12,
            lastRotation: 78,
            autoRotate: false,
            systems: ['DB-PROD', 'DB-DEV', 'APP-01']
        },
        {
            id: 3,
            name: 'svc_web',
            domain: 'CORP',
            criticality: 'HIGH',
            dependencies: 8,
            lastRotation: 30,
            autoRotate: true,
            systems: ['WEB-01', 'WEB-02', 'LB-01']
        }
    ]
}

export const mockActivityData = {
    summary: {
        totalUsers: 42,
        highRisk: 5,
        mediumRisk: 12,
        lowRisk: 25,
        afterHoursSessions: 42,
        weekendSessions: 15,
        failedSessions: 8
    },

    users: [
        {
            id: 1,
            name: 'admin_smith',
            sessions: 87,
            riskLevel: 'HIGH',
            riskScore: 6,
            afterHours: 48.3,
            weekend: 15,
            failed: 4,
            resources: 32,
            factors: ['High after-hours activity', 'Multiple failed sessions']
        },
        {
            id: 2,
            name: 'jdoe',
            sessions: 65,
            riskLevel: 'MEDIUM',
            riskScore: 3,
            afterHours: 22.5,
            weekend: 8,
            failed: 1,
            resources: 18,
            factors: ['Weekend access']
        },
        {
            id: 3,
            name: 'sysadmin',
            sessions: 54,
            riskLevel: 'LOW',
            riskScore: 1,
            afterHours: 5.2,
            weekend: 2,
            failed: 0,
            resources: 12,
            factors: []
        }
    ]
}

// Simulate API delay
export const fetchWithDelay = (data, delay = 500) => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(data), delay)
    })
}

// API service functions (will be replaced with real API calls)
export const api = {
    getDashboard: () => fetchWithDelay(mockDashboardData),
    getCredentials: () => fetchWithDelay(mockCredentialData),
    getDependencies: () => fetchWithDelay(mockDependencyData),
    getActivity: () => fetchWithDelay(mockActivityData)
}

export default api
