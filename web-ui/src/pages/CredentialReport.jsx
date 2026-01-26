import { useState, useEffect } from 'react'
import MetricCard from '../components/MetricCard'
import DataTable from '../components/DataTable'
import { api as mockApi } from '../services/mockData'
import './CredentialReport.css'

function CredentialReport() {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [threshold, setThreshold] = useState(90)

    useEffect(() => {
        loadData()
    }, [threshold])

    const loadData = async () => {
        setLoading(true)
        try {
            const result = await mockApi.getCredentials()
            setData(result)
        } catch (error) {
            console.error('Failed to load credential data:', error)
        } finally {
            setLoading(false)
        }
    }

    if (loading && !data) {
        return (
            <div className="report-loading">
                <div className="loading"></div>
                <p>Loading credential report...</p>
            </div>
        )
    }

    const columns = [
        { key: 'name', label: 'Credential Name' },
        { key: 'type', label: 'Type' },
        { key: 'platform', label: 'Platform' },
        { key: 'lastRotation', label: 'Last Rotation' },
        { key: 'daysAgo', label: 'Days Ago' },
        {
            key: 'status',
            label: 'Status',
            render: (value) => {
                const statusClass = value === 'OVERDUE' ? 'danger' : value === 'DUE SOON' ? 'warning' : 'success'
                return <span className={`badge badge-${statusClass}`}>{value}</span>
            }
        },
        {
            key: 'autoRotate',
            label: 'Auto-Rotate',
            render: (value) => value ? '✓' : '✗'
        }
    ]

    return (
        <div className="credential-report fade-in">
            <header className="report-header">
                <div className="header-left">
                    <h1>🔑 Credential Rotation Report</h1>
                    <p className="report-description">
                        Password rotation compliance and credential lifecycle management
                    </p>
                </div>
                <div className="header-actions">
                    <div className="threshold-control">
                        <label>Rotation Threshold:</label>
                        <select value={threshold} onChange={(e) => setThreshold(Number(e.target.value))}>
                            <option value={30}>30 days</option>
                            <option value={60}>60 days</option>
                            <option value={90}>90 days</option>
                            <option value={180}>180 days</option>
                        </select>
                    </div>
                    <button className="btn btn-primary">📥 Export Report</button>
                </div>
            </header>

            {/* Summary Metrics */}
            <section className="metrics-grid">
                <MetricCard
                    icon="🔐"
                    value={data.summary.total}
                    label="Total Credentials"
                    color="primary"
                />
                <MetricCard
                    icon="⚠️"
                    value={data.summary.overdue}
                    label="Overdue"
                    color="danger"
                />
                <MetricCard
                    icon="⏰"
                    value={data.summary.dueSoon}
                    label="Due Soon"
                    color="warning"
                />
                <MetricCard
                    icon="✅"
                    value={data.summary.ok}
                    label="Compliant"
                    color="success"
                />
            </section>

            {/* Compliance Rate */}
            <section className="compliance-section">
                <div className="compliance-card">
                    <h3>Rotation Compliance Rate</h3>
                    <div className="compliance-rate">
                        <span className={`rate-value ${data.summary.complianceRate >= 80 ? 'good' : data.summary.complianceRate >= 60 ? 'warning' : 'bad'}`}>
                            {data.summary.complianceRate}%
                        </span>
                        <div className="rate-bar">
                            <div
                                className="rate-fill"
                                style={{ width: `${data.summary.complianceRate}%` }}
                            ></div>
                        </div>
                    </div>
                    <div className="compliance-stats">
                        <div className="stat">
                            <span className="stat-label">Average Age:</span>
                            <span className="stat-value">{data.summary.avgRotationAge} days</span>
                        </div>
                        <div className="stat">
                            <span className="stat-label">Dormant:</span>
                            <span className="stat-value">{data.summary.dormant}</span>
                        </div>
                        <div className="stat">
                            <span className="stat-label">Never Used:</span>
                            <span className="stat-value">{data.summary.neverUsed}</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Credentials Table */}
            <section className="credentials-table-section">
                <DataTable
                    title="Credential Details"
                    columns={columns}
                    data={data.credentials}
                    maxRows={10}
                />
            </section>
        </div>
    )
}

export default CredentialReport
