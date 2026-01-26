import { useState } from 'react'
import Dashboard from './pages/Dashboard'
import Navigation from './components/Navigation'
import './App.css'

function App() {
    const [currentPage, setCurrentPage] = useState('dashboard')

    return (
        <div className="app">
            <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
            <main className="main-content">
                {currentPage === 'dashboard' && <Dashboard />}
                {currentPage === 'credentials' && <div className="container fade-in"><h2>Credential Rotation Report (Coming Soon)</h2></div>}
                {currentPage === 'dependencies' && <div className="container fade-in"><h2>Service Account Dependencies (Coming Soon)</h2></div>}
                {currentPage === 'activity' && <div className="container fade-in"><h2>User Activity Report (Coming Soon)</h2></div>}
            </main>
        </div>
    )
}

export default App
