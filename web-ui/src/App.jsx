import { useState } from 'react'
import Dashboard from './pages/Dashboard'
import CredentialReport from './pages/CredentialReport'
import UserActivityReport from './pages/UserActivityReport'
import Navigation from './components/Navigation'
import './App.css'

function App() {
    const [currentPage, setCurrentPage] = useState('dashboard')

    const renderPage = () => {
        switch (currentPage) {
            case 'dashboard':
                return <Dashboard />
            case 'credentials':
                return <CredentialReport />
            case 'activity':
                return <UserActivityReport />
            case 'dependencies':
                return (
                    <div className="container fade-in coming-soon">
                        <div className="coming-soon-content">
                            <span className="coming-soon-icon">🔗</span>
                            <h2>Service Account Dependencies</h2>
                            <p>Dependency mapping and impact analysis coming soon!</p>
                            <div className="feature-preview">
                                <h4>Preview Features:</h4>
                                <ul>
                                    <li>✓ Service account → system mapping</li>
                                    <li>✓ Criticality scoring (CRITICAL/HIGH/MEDIUM/LOW)</li>
                                    <li>✓ Change impact analysis</li>
                                    <li>✓ Interactive dependency visualization</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                )
            case 'settings':
                return (
                    <div className="container fade-in coming-soon">
                        <div className="coming-soon-content">
                            <span className="coming-soon-icon">⚙️</span>
                            <h2>Settings</h2>
                            <p>Configuration options coming soon!</p>
                            <div className="feature-preview">
                                <h4>Planned Settings:</h4>
                                <ul>
                                    <li>✓ NPS server connection</li>
                                    <li>✓ Report scheduling</li>
                                    <li>✓ Email notifications</li>
                                    <li>✓ Theme customization</li>
                                    <li>✓ User preferences</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                )
            default:
                return <Dashboard />
        }
    }

    return (
        <div className="app">
            <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
            <main className="main-content">
                {renderPage()}
            </main>
        </div>
    )
}

export default App
