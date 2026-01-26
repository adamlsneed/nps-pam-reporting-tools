import { useState, useEffect } from 'react'
import MetricCard from '../components/MetricCard'
import ComplianceGauge from '../components/ComplianceGauge'
import AlertPanel from '../components/AlertPanel'
import DataTable from '../components/DataTable'
import { api } from '../services/mockData'
import './Dashboard.css'

function Dashboard() {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [lastRefresh, setLastRefresh] = useState(new Date())

    useEffect(() => {
        loadDashboardData()
    }, [])

    const loadDashboardData = async () => {
        setLoading(true)
        try {
            const dashboardData = await api.getDashboard()
            setData(dashboardData)
            setLastRefresh(new Date())
        } catch (error) {
            console.error('Failed to load dashboard data:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleRefresh = () => {
        loadDashboardData()
    }

    if (loading && !data) {
        return (
            <div className="dashboard-loading">
                <div className="loading"></div>
                <p>Loading dashboard...</p>
            </div>
        )
    }

    const userColumns = [
        { key: 'rank', label: '#', width: '50px' },
        { key: 'name', label: 'User' },
        { key: 'sessions', label: 'Sessions' },
        {
            key: 'risk',
            label: 'Risk',
            render: (value) => (
                <span className={`badge badge-${value === 'high' ? 'danger' : value === 'medium' ? 'warning' : 'success'}`}>
                    {value.toUpperCase()}
                </span>
            )
        }
    ]

    const resourceColumns = [
        { key: 'rank', label: '#', width: '50px' },
        { key: 'name', label: 'Resource' },
        { key: 'sessions', label: 'Sessions' },
        { key: 'platform', label: 'Platform' }
    ]

    const activityColumns = [
        { key: 'time', label: 'Time', width: '80px' },
        { key: 'user', label: 'User' },
        { key: 'action', label: 'Action' },
        { key: 'resource', label: 'Resource' }
    ]

    return (
        <div className="dashboard fade-in">
            <header className="dashboard-header">
                <div className="header-left">
                    <h1>📊 PAM Dashboard</h1>
                    <span className="last-refresh">
                        Last updated: {lastRefresh.toLocaleTimeString()}
                    </span>
                </div>
                <div className="header-actions">
                    <button className="btn btn-secondary" onClick={handleRefresh} disabled={loading}>
                        {loading ? '⟳ Refreshing...' : '🔄 Refresh'}
                    </button>
                    <button className="btn btn-primary">
                        📥 Export Report
                    </button>
                </div>
            </header>

            {/* Key Metrics */}
            <section className="metrics-grid">
                <MetricCard
                    icon="🖥️"
                    value={data.metrics.totalResources}
                    label="Managed Resources"
                    trend={data.metrics.trends.resources}
                    trendLabel="vs last month"
                    color="primary"
                />
                <MetricCard
                    icon="🔑"
                    value={data.metrics.totalCredentials}
                    label="Total Credentials"
                    trend={data.metrics.trends.credentials}
                    trendLabel="vs last month"
                    color="success"
                />
                <MetricCard
                    icon="⚡"
                    value={data.metrics.activeSessions}
                    label="Active Sessions"
                    trend={data.metrics.trends.sessions}
                    trendLabel="vs yesterday"
                    color="warning"
                />
                <MetricCard
                    icon="📋"
                    value={data.metrics.accessPolicies}
                    label="Access Policies"
                    color="primary"
                />
            </section>

            {/* Compliance & Alerts Row */}
            <section className="dashboard-row">
                <div className="dashboard-col">
                    <ComplianceGauge
                        score={data.compliance.score}
                        checks={data.compliance.checks}
                    />
                </div>
                <div className="dashboard-col">
                    <AlertPanel alerts={data.alerts} />
                </div>
            </section>

            {/* Activity Chart Placeholder */}
            <section className="activity-chart-section">
                <div className="chart-card">
                    <h3>📈 24-Hour Session Activity</h3>
                    <div className="chart-placeholder">
                        <div className="chart-bars">
                            {data.sessionStats.last24Hours.slice(6, 18).map((stat, index) => (
                                <div key={index} className="chart-bar-container">
                                    <div
                                        className="chart-bar"
                                        style={{ height: `${(stat.sessions / 35) * 100}%` }}
                                        title={`${stat.hour}: ${stat.sessions} sessions`}
                                    ></div>
                                    <span className="chart-label">{stat.hour.replace(' AM', 'a').replace(' PM', 'p')}</span>
                                </div>
                            ))}
                        </div>
                        <p className="chart-note">Business hours session distribution</p>
                    </div>
                </div>
            </section>

            {/* Tables Row */}
            <section className="dashboard-row tables-row">
                <div className="dashboard-col">
                    <DataTable
                        title="👥 Top Active Users (30 days)"
                        columns={userColumns}
                        data={data.topUsers}
                        maxRows={5}
                    />
                </div>
                <div className="dashboard-col">
                    <DataTable
                        title="🎯 Most Accessed Resources"
                        columns={resourceColumns}
                        data={data.topResources}
                        maxRows={5}
                    />
                </div>
            </section>

            {/* Recent Activity */}
            <section className="recent-activity-section">
                <DataTable
                    title="🕐 Recent Activity"
                    columns={activityColumns}
                    data={data.recentActivity}
                    maxRows={5}
                />
            </section>
        </div>
    )
}

export default Dashboard
