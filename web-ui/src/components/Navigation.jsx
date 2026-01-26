import './Navigation.css'

const menuItems = [
    { id: 'dashboard', icon: '📊', label: 'Dashboard' },
    { id: 'credentials', icon: '🔑', label: 'Credential Rotation' },
    { id: 'dependencies', icon: '🔗', label: 'Dependencies' },
    { id: 'activity', icon: '👥', label: 'User Activity' },
    { id: 'settings', icon: '⚙️', label: 'Settings' },
]

function Navigation({ currentPage, setCurrentPage }) {
    return (
        <nav className="navigation">
            <div className="nav-header">
                <div className="logo">
                    <span className="logo-icon">🔐</span>
                    <div className="logo-text">
                        <span className="logo-title">NPS PAM</span>
                        <span className="logo-subtitle">Reporting</span>
                    </div>
                </div>
            </div>

            <ul className="nav-menu">
                {menuItems.map((item) => (
                    <li key={item.id}>
                        <button
                            className={`nav-item ${currentPage === item.id ? 'active' : ''}`}
                            onClick={() => setCurrentPage(item.id)}
                        >
                            <span className="nav-icon">{item.icon}</span>
                            <span className="nav-label">{item.label}</span>
                        </button>
                    </li>
                ))}
            </ul>

            <div className="nav-footer">
                <div className="connection-status">
                    <span className="status-dot connected"></span>
                    <span className="status-text">Connected to NPS</span>
                </div>
                <div className="version">v1.0.0</div>
            </div>
        </nav>
    )
}

export default Navigation
