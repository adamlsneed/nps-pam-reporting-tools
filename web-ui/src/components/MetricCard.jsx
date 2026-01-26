import './MetricCard.css'

function MetricCard({ icon, value, label, trend, trendLabel, color = 'primary' }) {
    const colorClass = `metric-card-${color}`

    return (
        <div className={`metric-card ${colorClass}`}>
            <div className="metric-icon">{icon}</div>
            <div className="metric-content">
                <div className="metric-value">{value}</div>
                <div className="metric-label">{label}</div>
                {trend !== undefined && (
                    <div className={`metric-trend ${trend >= 0 ? 'up' : 'down'}`}>
                        <span className="trend-arrow">{trend >= 0 ? '↑' : '↓'}</span>
                        <span className="trend-value">{Math.abs(trend)}%</span>
                        {trendLabel && <span className="trend-label">{trendLabel}</span>}
                    </div>
                )}
            </div>
        </div>
    )
}

export default MetricCard
