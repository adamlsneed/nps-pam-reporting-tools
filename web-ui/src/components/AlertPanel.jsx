import './AlertPanel.css'

function AlertPanel({ alerts = [] }) {
    const getSeverityClass = (severity) => {
        switch (severity) {
            case 'critical': return 'alert-critical'
            case 'warning': return 'alert-warning'
            case 'info': return 'alert-info'
            default: return 'alert-info'
        }
    }

    const getSeverityIcon = (severity) => {
        switch (severity) {
            case 'critical': return '🔴'
            case 'warning': return '🟠'
            case 'info': return '🔵'
            default: return 'ℹ️'
        }
    }

    return (
        <div className="alert-panel">
            <div className="alert-header">
                <h3>⚠️ Security Alerts</h3>
                <span className="alert-count">{alerts.length}</span>
            </div>

            <div className="alert-list">
                {alerts.length === 0 ? (
                    <div className="no-alerts">
                        <span className="no-alerts-icon">✅</span>
                        <span>No active security alerts</span>
                    </div>
                ) : (
                    alerts.map((alert, index) => (
                        <div key={index} className={`alert-item ${getSeverityClass(alert.severity)}`}>
                            <span className="alert-icon">{getSeverityIcon(alert.severity)}</span>
                            <div className="alert-content">
                                <span className="alert-message">{alert.message}</span>
                                {alert.count && <span className="alert-detail">{alert.count} items affected</span>}
                            </div>
                            <span className="alert-time">{alert.time}</span>
                        </div>
                    ))
                )}
            </div>

            {alerts.length > 0 && (
                <button className="view-all-btn">View All Alerts →</button>
            )}
        </div>
    )
}

export default AlertPanel
