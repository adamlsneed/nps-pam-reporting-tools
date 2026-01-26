import { useState, useEffect } from 'react'
import './Settings.css'

function Settings() {
    const [activeTab, setActiveTab] = useState('connection')
    const [saving, setSaving] = useState(false)
    const [testingConnection, setTestingConnection] = useState(false)
    const [connectionStatus, setConnectionStatus] = useState(null)

    const [config, setConfig] = useState({
        npsServer: 'https://nps.company.com:6500',
        username: '',
        password: '',
        mfaEnabled: true,
        skipCertCheck: false,

        // Refresh Settings
        dashboardRefresh: 60,
        alertRefresh: 30,

        // Thresholds
        rotationThreshold: 90,
        dormantThreshold: 180,
        afterHoursStart: 20,
        afterHoursEnd: 6,

        // Notifications
        emailEnabled: false,
        emailRecipients: '',
        alertOnHighRisk: true,
        alertOnOverdue: true,
        dailyDigest: true,

        // Appearance
        theme: 'dark',
        compactMode: false
    })

    const handleChange = (field, value) => {
        setConfig(prev => ({ ...prev, [field]: value }))
    }

    const handleSave = async () => {
        setSaving(true)
        // Simulate save
        await new Promise(resolve => setTimeout(resolve, 1000))
        setSaving(false)
        alert('Settings saved successfully!')
    }

    const handleTestConnection = async () => {
        setTestingConnection(true)
        setConnectionStatus(null)

        // Simulate connection test
        await new Promise(resolve => setTimeout(resolve, 2000))

        // Random success/failure for demo
        const success = Math.random() > 0.3
        setConnectionStatus({
            success,
            message: success
                ? 'Successfully connected to NPS server!'
                : 'Connection failed. Please check your credentials and server address.'
        })
        setTestingConnection(false)
    }

    const tabs = [
        { id: 'connection', label: '🔌 Connection', icon: '🔌' },
        { id: 'thresholds', label: '⚙️ Thresholds', icon: '⚙️' },
        { id: 'notifications', label: '🔔 Notifications', icon: '🔔' },
        { id: 'appearance', label: '🎨 Appearance', icon: '🎨' }
    ]

    return (
        <div className="settings-page fade-in">
            <header className="settings-header">
                <h1>⚙️ Settings</h1>
                <p>Configure your NPS PAM Reporting dashboard</p>
            </header>

            <div className="settings-container">
                {/* Tabs */}
                <nav className="settings-tabs">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            {tab.label}
                        </button>
                    ))}
                </nav>

                {/* Tab Content */}
                <div className="settings-content">
                    {/* Connection Settings */}
                    {activeTab === 'connection' && (
                        <div className="settings-panel fade-in">
                            <h2>NPS Server Connection</h2>
                            <p className="panel-description">
                                Configure the connection to your Netwrix Privilege Secure server.
                            </p>

                            <div className="form-group">
                                <label>NPS Server URL</label>
                                <input
                                    type="url"
                                    value={config.npsServer}
                                    onChange={(e) => handleChange('npsServer', e.target.value)}
                                    placeholder="https://nps.company.com:6500"
                                />
                                <span className="form-hint">Include the port number (usually 6500)</span>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Username</label>
                                    <input
                                        type="text"
                                        value={config.username}
                                        onChange={(e) => handleChange('username', e.target.value)}
                                        placeholder="domain\\username"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input
                                        type="password"
                                        value={config.password}
                                        onChange={(e) => handleChange('password', e.target.value)}
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="checkbox-label">
                                    <input
                                        type="checkbox"
                                        checked={config.mfaEnabled}
                                        onChange={(e) => handleChange('mfaEnabled', e.target.checked)}
                                    />
                                    <span>MFA Enabled (TOTP)</span>
                                </label>
                                <span className="form-hint">Enable if your NPS requires MFA authentication</span>
                            </div>

                            <div className="form-group">
                                <label className="checkbox-label">
                                    <input
                                        type="checkbox"
                                        checked={config.skipCertCheck}
                                        onChange={(e) => handleChange('skipCertCheck', e.target.checked)}
                                    />
                                    <span>Skip Certificate Validation</span>
                                </label>
                                <span className="form-hint warning">
                                    ⚠️ Only enable for testing with self-signed certificates
                                </span>
                            </div>

                            <div className="connection-test">
                                <button
                                    className="btn btn-secondary"
                                    onClick={handleTestConnection}
                                    disabled={testingConnection}
                                >
                                    {testingConnection ? '🔄 Testing...' : '🔌 Test Connection'}
                                </button>

                                {connectionStatus && (
                                    <div className={`connection-status ${connectionStatus.success ? 'success' : 'error'}`}>
                                        <span className="status-icon">
                                            {connectionStatus.success ? '✅' : '❌'}
                                        </span>
                                        <span>{connectionStatus.message}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Thresholds Settings */}
                    {activeTab === 'thresholds' && (
                        <div className="settings-panel fade-in">
                            <h2>Report Thresholds</h2>
                            <p className="panel-description">
                                Configure thresholds for compliance checking and alerting.
                            </p>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Password Rotation Threshold (days)</label>
                                    <input
                                        type="number"
                                        value={config.rotationThreshold}
                                        onChange={(e) => handleChange('rotationThreshold', parseInt(e.target.value))}
                                        min="1"
                                        max="365"
                                    />
                                    <span className="form-hint">Credentials older than this are flagged as overdue</span>
                                </div>
                                <div className="form-group">
                                    <label>Dormant Credential Threshold (days)</label>
                                    <input
                                        type="number"
                                        value={config.dormantThreshold}
                                        onChange={(e) => handleChange('dormantThreshold', parseInt(e.target.value))}
                                        min="30"
                                        max="365"
                                    />
                                    <span className="form-hint">Credentials unused for this period are flagged as dormant</span>
                                </div>
                            </div>

                            <div className="form-section">
                                <h3>After-Hours Detection</h3>
                                <p className="section-description">
                                    Define business hours for after-hours activity tracking
                                </p>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>After-Hours Start (24h)</label>
                                        <input
                                            type="number"
                                            value={config.afterHoursStart}
                                            onChange={(e) => handleChange('afterHoursStart', parseInt(e.target.value))}
                                            min="0"
                                            max="23"
                                        />
                                        <span className="form-hint">Hour when after-hours begins (e.g., 20 = 8 PM)</span>
                                    </div>
                                    <div className="form-group">
                                        <label>After-Hours End (24h)</label>
                                        <input
                                            type="number"
                                            value={config.afterHoursEnd}
                                            onChange={(e) => handleChange('afterHoursEnd', parseInt(e.target.value))}
                                            min="0"
                                            max="23"
                                        />
                                        <span className="form-hint">Hour when after-hours ends (e.g., 6 = 6 AM)</span>
                                    </div>
                                </div>
                            </div>

                            <div className="form-section">
                                <h3>Auto-Refresh Intervals</h3>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Dashboard Refresh (seconds)</label>
                                        <select
                                            value={config.dashboardRefresh}
                                            onChange={(e) => handleChange('dashboardRefresh', parseInt(e.target.value))}
                                        >
                                            <option value={0}>Disabled</option>
                                            <option value={30}>30 seconds</option>
                                            <option value={60}>1 minute</option>
                                            <option value={300}>5 minutes</option>
                                            <option value={600}>10 minutes</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Alerts Refresh (seconds)</label>
                                        <select
                                            value={config.alertRefresh}
                                            onChange={(e) => handleChange('alertRefresh', parseInt(e.target.value))}
                                        >
                                            <option value={0}>Disabled</option>
                                            <option value={15}>15 seconds</option>
                                            <option value={30}>30 seconds</option>
                                            <option value={60}>1 minute</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Notifications Settings */}
                    {activeTab === 'notifications' && (
                        <div className="settings-panel fade-in">
                            <h2>Notification Settings</h2>
                            <p className="panel-description">
                                Configure email alerts and notification preferences.
                            </p>

                            <div className="form-group">
                                <label className="checkbox-label">
                                    <input
                                        type="checkbox"
                                        checked={config.emailEnabled}
                                        onChange={(e) => handleChange('emailEnabled', e.target.checked)}
                                    />
                                    <span>Enable Email Notifications</span>
                                </label>
                            </div>

                            {config.emailEnabled && (
                                <div className="notification-options fade-in">
                                    <div className="form-group">
                                        <label>Email Recipients</label>
                                        <input
                                            type="text"
                                            value={config.emailRecipients}
                                            onChange={(e) => handleChange('emailRecipients', e.target.value)}
                                            placeholder="security@company.com, admin@company.com"
                                        />
                                        <span className="form-hint">Comma-separated list of email addresses</span>
                                    </div>

                                    <div className="form-section">
                                        <h3>Alert Types</h3>
                                        <div className="checkbox-group">
                                            <label className="checkbox-label">
                                                <input
                                                    type="checkbox"
                                                    checked={config.alertOnHighRisk}
                                                    onChange={(e) => handleChange('alertOnHighRisk', e.target.checked)}
                                                />
                                                <span>High-Risk User Activity</span>
                                            </label>
                                            <label className="checkbox-label">
                                                <input
                                                    type="checkbox"
                                                    checked={config.alertOnOverdue}
                                                    onChange={(e) => handleChange('alertOnOverdue', e.target.checked)}
                                                />
                                                <span>Overdue Password Rotation</span>
                                            </label>
                                            <label className="checkbox-label">
                                                <input
                                                    type="checkbox"
                                                    checked={config.dailyDigest}
                                                    onChange={(e) => handleChange('dailyDigest', e.target.checked)}
                                                />
                                                <span>Daily Compliance Digest</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Appearance Settings */}
                    {activeTab === 'appearance' && (
                        <div className="settings-panel fade-in">
                            <h2>Appearance</h2>
                            <p className="panel-description">
                                Customize the look and feel of your dashboard.
                            </p>

                            <div className="form-group">
                                <label>Theme</label>
                                <div className="theme-options">
                                    <button
                                        className={`theme-btn ${config.theme === 'dark' ? 'active' : ''}`}
                                        onClick={() => handleChange('theme', 'dark')}
                                    >
                                        <span className="theme-icon">🌙</span>
                                        <span>Dark</span>
                                    </button>
                                    <button
                                        className={`theme-btn ${config.theme === 'light' ? 'active' : ''}`}
                                        onClick={() => handleChange('theme', 'light')}
                                        disabled
                                    >
                                        <span className="theme-icon">☀️</span>
                                        <span>Light</span>
                                        <span className="coming-soon-badge">Soon</span>
                                    </button>
                                    <button
                                        className={`theme-btn ${config.theme === 'system' ? 'active' : ''}`}
                                        onClick={() => handleChange('theme', 'system')}
                                        disabled
                                    >
                                        <span className="theme-icon">💻</span>
                                        <span>System</span>
                                        <span className="coming-soon-badge">Soon</span>
                                    </button>
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="checkbox-label">
                                    <input
                                        type="checkbox"
                                        checked={config.compactMode}
                                        onChange={(e) => handleChange('compactMode', e.target.checked)}
                                    />
                                    <span>Compact Mode</span>
                                </label>
                                <span className="form-hint">Reduce padding and spacing for more data density</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Save Button */}
                <div className="settings-actions">
                    <button className="btn btn-secondary">Reset to Defaults</button>
                    <button
                        className="btn btn-primary"
                        onClick={handleSave}
                        disabled={saving}
                    >
                        {saving ? '💾 Saving...' : '💾 Save Settings'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Settings
