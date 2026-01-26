import { useState } from 'react'
import Dashboard from './pages/Dashboard'
import CredentialReport from './pages/CredentialReport'
import DependencyReport from './pages/DependencyReport'
import UserActivityReport from './pages/UserActivityReport'
import Settings from './pages/Settings'
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
            case 'dependencies':
                return <DependencyReport />
            case 'activity':
                return <UserActivityReport />
            case 'settings':
                return <Settings />
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
