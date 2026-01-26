import './ComplianceGauge.css'

function ComplianceGauge({ score, maxScore = 100, checks = [] }) {
    const percentage = Math.round((score / maxScore) * 100)
    const circumference = 2 * Math.PI * 90
    const offset = circumference - (percentage / 100) * circumference

    const getColor = () => {
        if (percentage >= 80) return 'var(--success)'
        if (percentage >= 60) return 'var(--warning)'
        return 'var(--danger)'
    }

    return (
        <div className="compliance-gauge">
            <div className="gauge-container">
                <svg viewBox="0 0 200 200" className="gauge-svg">
                    <circle
                        cx="100"
                        cy="100"
                        r="90"
                        fill="none"
                        stroke="var(--bg-tertiary)"
                        strokeWidth="12"
                    />
                    <circle
                        cx="100"
                        cy="100"
                        r="90"
                        fill="none"
                        stroke={getColor()}
                        strokeWidth="12"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        transform="rotate(-90 100 100)"
                        className="gauge-progress"
                    />
                </svg>
                <div className="gauge-value">
                    <span className="gauge-percentage" style={{ color: getColor() }}>{percentage}%</span>
                    <span className="gauge-label">Compliance</span>
                </div>
            </div>

            {checks.length > 0 && (
                <div className="compliance-checks">
                    {checks.map((check, index) => (
                        <div key={index} className={`check-item ${check.passed ? 'passed' : 'failed'}`}>
                            <span className="check-icon">{check.passed ? '✓' : '✗'}</span>
                            <span className="check-text">{check.label}</span>
                            {check.value && <span className="check-value">{check.value}</span>}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default ComplianceGauge
