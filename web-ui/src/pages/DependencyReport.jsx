import { useState, useEffect } from 'react'
import MetricCard from '../components/MetricCard'
import DataTable from '../components/DataTable'
import { api as mockApi, mockDependencyData as mockData } from '../services/mockData'
import './DependencyReport.css'

function DependencyReport() {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [selectedAccount, setSelectedAccount] = useState(null)

    useEffect(() => {
        loadData()
    }, [])

    const loadData = async () => {
        setLoading(true)
        try {
            const result = await mockApi.getDependencies()
            setData(result)
        } catch (error) {
            console.error('Failed to load dependency data:', error)
        } finally {
            setLoading(false)
        }
    }

    if (loading && !data) {
        return (
            <div className="report-loading">
                <div className="loading"></div>
                <p>Loading dependency map...</p>
            </div>
        )
    }

    const getCriticalityClass = (criticality) => {
        switch (criticality) {
            case 'CRITICAL': return 'danger'
            case 'HIGH': return 'warning'
            case 'MEDIUM': return 'info'
            default: return 'success'
        }
    }

    const getCriticalityIcon = (criticality) => {
        switch (criticality) {
            case 'CRITICAL': return '🔴'
            case 'HIGH': return '🟠'
            case 'MEDIUM': return '🟡'
            default: return '🟢'
        }
    }

    return (
        <div className="dependency-report fade-in">
            <header className="report-header">
                <div className="header-left">
                    <h1>🔗 Service Account Dependencies</h1>
                    <p className="report-description">
                        Dependency mapping, impact analysis, and password rotation planning
                    </p>
                </div>
                <div className="header-actions">
                    <button className="btn btn-secondary">🔍 Analyze Impact</button>
                    <button className="btn btn-primary">📥 Export Report</button>
                </div>
            </header>

            {/* Summary Metrics */}
            <section className="metrics-grid">
                <MetricCard
                    icon="🔴"
                    value={data.summary.critical}
                    label="Critical"
                    color="danger"
                />
                <MetricCard
                    icon="🟠"
                    value={data.summary.high}
                    label="High"
                    color="warning"
                />
                <MetricCard
                    icon="🟡"
                    value={data.summary.medium}
                    label="Medium"
                    color="primary"
                />
                <MetricCard
                    icon="🟢"
                    value={data.summary.low}
                    label="Low"
                    color="success"
                />
            </section>

            {/* Criticality Distribution */}
            <section className="distribution-section">
                <div className="distribution-card">
                    <h3>Service Account Distribution by Criticality</h3>
                    <div className="distribution-visual">
                        <div className="bar-stack">
                            {['critical', 'high', 'medium', 'low'].map((level) => {
                                const count = data.summary[level]
                                const percentage = (count / data.summary.total) * 100
                                return (
                                    <div
                                        key={level}
                                        className={`bar-segment ${level}`}
                                        style={{ width: `${percentage}%` }}
                                        title={`${level.charAt(0).toUpperCase() + level.slice(1)}: ${count} (${percentage.toFixed(1)}%)`}
                                    >
                                        {percentage > 10 && <span>{count}</span>}
                                    </div>
                                )
                            })}
                        </div>
                        <div className="bar-legend">
                            <span className="legend-item"><span className="dot critical"></span> Critical</span>
                            <span className="legend-item"><span className="dot high"></span> High</span>
                            <span className="legend-item"><span className="dot medium"></span> Medium</span>
                            <span className="legend-item"><span className="dot low"></span> Low</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Service Account Cards */}
            <section className="accounts-section">
                <h3>Service Account Details</h3>
                <div className="accounts-grid">
                    {data.serviceAccounts.map((account) => (
                        <div
                            key={account.id}
                            className={`account-card ${selectedAccount === account.id ? 'selected' : ''}`}
                            onClick={() => setSelectedAccount(selectedAccount === account.id ? null : account.id)}
                        >
                            <div className="account-header">
                                <div className="account-info">
                                    <span className="account-icon">{getCriticalityIcon(account.criticality)}</span>
                                    <div>
                                        <h4>{account.name}</h4>
                                        <span className="account-domain">{account.domain}</span>
                                    </div>
                                </div>
                                <span className={`badge badge-${getCriticalityClass(account.criticality)}`}>
                                    {account.criticality}
                                </span>
                            </div>

                            <div className="account-stats">
                                <div className="stat">
                                    <span className="stat-value">{account.dependencies}</span>
                                    <span className="stat-label">Dependencies</span>
                                </div>
                                <div className="stat">
                                    <span className="stat-value">{account.lastRotation}d</span>
                                    <span className="stat-label">Last Rotation</span>
                                </div>
                                <div className="stat">
                                    <span className={`stat-value ${account.autoRotate ? 'enabled' : 'disabled'}`}>
                                        {account.autoRotate ? '✓' : '✗'}
                                    </span>
                                    <span className="stat-label">Auto-Rotate</span>
                                </div>
                            </div>

                            {selectedAccount === account.id && (
                                <div className="account-details fade-in">
                                    <div className="impact-warning">
                                        <span className="warning-icon">⚠️</span>
                                        <div className="warning-content">
                                            <strong>Impact of Password Change:</strong>
                                            <p>
                                                {account.autoRotate
                                                    ? 'Auto-rotation enabled - Minimal manual intervention required'
                                                    : `Manual rotation required - ${account.dependencies} systems may experience service disruption`
                                                }
                                            </p>
                                        </div>
                                    </div>

                                    <div className="dependent-systems">
                                        <h5>Dependent Systems:</h5>
                                        <div className="systems-list">
                                            {account.systems.map((system, idx) => (
                                                <span key={idx} className="system-tag">{system}</span>
                                            ))}
                                            {account.dependencies > account.systems.length && (
                                                <span className="system-tag more">
                                                    +{account.dependencies - account.systems.length} more
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="account-actions">
                                        <button className="btn btn-secondary btn-sm">View Full Dependency Map</button>
                                        <button className="btn btn-primary btn-sm">Schedule Rotation</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            {/* Impact Analysis */}
            <section className="impact-section">
                <div className="impact-card">
                    <h3>🔍 Password Rotation Impact Analysis</h3>
                    <div className="impact-table">
                        <div className="impact-row header">
                            <span>Account</span>
                            <span>Criticality</span>
                            <span>Dependencies</span>
                            <span>Auto-Rotate</span>
                            <span>Recommended Action</span>
                        </div>
                        {data.serviceAccounts.map((account) => (
                            <div key={account.id} className={`impact-row ${getCriticalityClass(account.criticality)}`}>
                                <span className="account-name">{account.name}</span>
                                <span>
                                    <span className={`badge badge-${getCriticalityClass(account.criticality)}`}>
                                        {account.criticality}
                                    </span>
                                </span>
                                <span>{account.dependencies} systems</span>
                                <span className={account.autoRotate ? 'enabled' : 'disabled'}>
                                    {account.autoRotate ? '✓ Enabled' : '✗ Disabled'}
                                </span>
                                <span className="recommendation">
                                    {account.autoRotate
                                        ? '✅ Safe to rotate automatically'
                                        : account.criticality === 'CRITICAL'
                                            ? '⚠️ Schedule maintenance window'
                                            : '📋 Plan staged rotation'
                                    }
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default DependencyReport
