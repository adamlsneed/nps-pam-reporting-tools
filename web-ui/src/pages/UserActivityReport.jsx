import { useState, useEffect } from 'react'
import MetricCard from '../components/MetricCard'
import DataTable from '../components/DataTable'
import { api as mockApi } from '../services/mockData'
import './UserActivityReport.css'

function UserActivityReport() {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [days, setDays] = useState(30)

    useEffect(() => {
        loadData()
    }, [days])

    const loadData = async () => {
        setLoading(true)
        try {
            const result = await mockApi.getActivity()
            setData(result)
        } catch (error) {
            console.error('Failed to load activity data:', error)
        } finally {
            setLoading(false)
        }
    }

    if (loading && !data) {
        return (
            <div className="report-loading">
                <div className="loading"></div>
                <p>Loading user activity report...</p>
            </div>
        )
    }

    const columns = [
        { key: 'name', label: 'User' },
        { key: 'sessions', label: 'Sessions' },
        {
            key: 'riskLevel',
            label: 'Risk Level',
            render: (value) => {
                const riskClass = value === 'HIGH' ? 'danger' : value === 'MEDIUM' ? 'warning' : 'success'
                return <span className={`badge badge-${riskClass}`}>{value}</span>
            }
        },
        {
            key: 'afterHours',
            label: 'After Hours %',
            render: (value) => {
                const color = value > 30 ? 'var(--danger)' : value > 15 ? 'var(--warning)' : 'var(--success)'
                return <span style={{ color, fontWeight: 600 }}>{value}%</span>
            }
        },
        { key: 'weekend', label: 'Weekend' },
        { key: 'failed', label: 'Failed' },
        { key: 'resources', label: 'Resources' }
    ]

    return (
        <div className="activity-report fade-in">
            <header className="report-header">
                <div className="header-left">
                    <h1>👥 Privileged User Activity</h1>
                    <p className="report-description">
                        User behavior analysis, risk scoring, and anomaly detection
                    </p>
                </div>
                <div className="header-actions">
                    <div className="days-control">
                        <label>Analysis Period:</label>
                        <select value={days} onChange={(e) => setDays(Number(e.target.value))}>
                            <option value={7}>Last 7 days</option>
                            <option value={30}>Last 30 days</option>
                            <option value={90}>Last 90 days</option>
                            <option value={365}>Last year</option>
                        </select>
                    </div>
                    <button className="btn btn-primary">📥 Export Report</button>
                </div>
            </header>

            {/* Summary Metrics */}
            <section className="metrics-grid">
                <MetricCard
                    icon="👥"
                    value={data.summary.totalUsers}
                    label="Active Users"
                    color="primary"
                />
                <MetricCard
                    icon="🔴"
                    value={data.summary.highRisk}
                    label="High Risk"
                    color="danger"
                />
                <MetricCard
                    icon="🟠"
                    value={data.summary.mediumRisk}
                    label="Medium Risk"
                    color="warning"
                />
                <MetricCard
                    icon="🟢"
                    value={data.summary.lowRisk}
                    label="Low Risk"
                    color="success"
                />
            </section>

            {/* Risk Distribution */}
            <section className="risk-distribution">
                <div className="distribution-card">
                    <h3>Risk Distribution</h3>
                    <div className="distribution-bars">
                        <div className="dist-bar">
                            <div className="dist-label">High Risk</div>
                            <div className="dist-track">
                                <div
                                    className="dist-fill high"
                                    style={{ width: `${(data.summary.highRisk / data.summary.totalUsers) * 100}%` }}
                                ></div>
                            </div>
                            <div className="dist-value">{data.summary.highRisk}</div>
                        </div>
                        <div className="dist-bar">
                            <div className="dist-label">Medium Risk</div>
                            <div className="dist-track">
                                <div
                                    className="dist-fill medium"
                                    style={{ width: `${(data.summary.mediumRisk / data.summary.totalUsers) * 100}%` }}
                                ></div>
                            </div>
                            <div className="dist-value">{data.summary.mediumRisk}</div>
                        </div>
                        <div className="dist-bar">
                            <div className="dist-label">Low Risk</div>
                            <div className="dist-track">
                                <div
                                    className="dist-fill low"
                                    style={{ width: `${(data.summary.lowRisk / data.summary.totalUsers) * 100}%` }}
                                ></div>
                            </div>
                            <div className="dist-value">{data.summary.lowRisk}</div>
                        </div>
                    </div>
                </div>

                <div className="stats-card">
                    <h3>Activity Statistics</h3>
                    <div className="stat-items">
                        <div className="stat-item">
                            <span className="stat-icon">🌙</span>
                            <div className="stat-content">
                                <span className="stat-value">{data.summary.afterHoursSessions}</span>
                                <span className="stat-label">After-Hours Sessions</span>
                            </div>
                        </div>
                        <div className="stat-item">
                            <span className="stat-icon">📅</span>
                            <div className="stat-content">
                                <span className="stat-value">{data.summary.weekendSessions}</span>
                                <span className="stat-label">Weekend Sessions</span>
                            </div>
                        </div>
                        <div className="stat-item">
                            <span className="stat-icon">❌</span>
                            <div className="stat-content">
                                <span className="stat-value">{data.summary.failedSessions}</span>
                                <span className="stat-label">Failed Sessions</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Users Table */}
            <section className="users-table-section">
                <DataTable
                    title="User Activity Details"
                    columns={columns}
                    data={data.users}
                    maxRows={10}
                />
            </section>

            {/* Risk Factor Details */}
            <section className="risk-factors-section">
                <div className="risk-card">
                    <h3>🔍 High-Risk Users Analysis</h3>
                    {data.users.filter(u => u.riskLevel === 'HIGH').map((user, index) => (
                        <div key={index} className="risk-user">
                            <div className="user-header">
                                <span className="user-name">{user.name}</span>
                                <span className="badge badge-danger">Risk Score: {user.riskScore}</span>
                            </div>
                            <div className="user-factors">
                                <span className="factors-label">Risk Factors:</span>
                                <div className="factors-list">
                                    {user.factors.map((factor, i) => (
                                        <span key={i} className="factor-tag">⚠ {factor}</span>
                                    ))}
                                </div>
                            </div>
                            <div className="user-stats">
                                <span>Sessions: {user.sessions}</span>
                                <span>After-Hours: {user.afterHours}%</span>
                                <span>Weekend: {user.weekend}</span>
                                <span>Resources: {user.resources}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}

export default UserActivityReport
