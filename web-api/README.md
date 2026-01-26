# NPS PAM Web API

Node.js/Express backend for NPS PAM Reporting Tools.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm 9+
- PowerShell Core (pwsh) for report execution

### Installation

```bash
# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Edit configuration
nano .env

# Start development server
npm run dev

# Start production server
npm start
```

### Development URLs
- **API**: http://localhost:5000/api
- **Health Check**: http://localhost:5000/api/health

---

## 📁 Project Structure

```
web-api/
├── routes/                  # API route handlers
│   ├── dashboard.js         # Dashboard endpoints
│   ├── health.js           # Health check endpoints
│   └── reports.js          # Report endpoints
├── services/               # Business logic
│   └── powershell.js       # PowerShell execution service
├── server.js               # Express server entry
├── package.json
└── .env.example            # Environment template
```

---

## 🔌 API Endpoints

### Health
```
GET /api/health          - Server health status
GET /api/health/nps      - NPS connection status
```

### Dashboard
```
GET /api/dashboard           - Full dashboard data
GET /api/dashboard/metrics   - Key metrics only
GET /api/dashboard/compliance - Compliance status
GET /api/dashboard/alerts    - Security alerts
```

### Reports
```
GET /api/reports                          - List available reports
GET /api/reports/credentials              - Credential rotation report
GET /api/reports/credentials?threshold=60 - With custom threshold
GET /api/reports/dependencies             - Service account dependencies
GET /api/reports/dependencies?showImpact=true
GET /api/reports/activity                 - User activity report
GET /api/reports/activity?days=90&includeBehavioral=true
GET /api/reports/export/:type?format=csv  - Export report
```

---

## ⚙️ Configuration

### Environment Variables

```env
# Server
PORT=5000
NODE_ENV=development

# Frontend CORS
FRONTEND_URL=http://localhost:3000

# NPS Connection
NPS_SERVER=https://nps.company.com:6500
NPS_USERNAME=domain\\user
NPS_PASSWORD=your_password
NPS_MFA_ENABLED=true

# PowerShell Module
NPS_MODULE_PATH=../nps-powershell-module/NPS-Module-Complete.psm1

# Cache
CACHE_TIMEOUT=60000
```

---

## 🔧 PowerShell Integration

### How It Works
1. API receives request
2. PowerShellService executes PS scripts
3. Results parsed as JSON
4. Response returned to frontend

### Script Execution
```javascript
const ps = new PowerShellService()
const data = await ps.getCredentialRotationReport({
  threshold: 90,
  includeDormant: true
})
```

### Mock Data Fallback
When NPS is not connected, the API returns realistic mock data for development.

---

## 📊 Response Formats

### Dashboard Response
```json
{
  "metrics": {
    "totalResources": 245,
    "totalCredentials": 187,
    "activeSessions": 12,
    "accessPolicies": 8
  },
  "compliance": {
    "score": 83.3,
    "checks": [...]
  },
  "alerts": [...],
  "topUsers": [...],
  "topResources": [...]
}
```

### Report Response
```json
{
  "summary": {
    "total": 245,
    "overdue": 23,
    "complianceRate": 72.24
  },
  "data": [...]
}
```

---

## 🔒 Security

### CORS
Configured to only allow requests from the frontend origin.

### Authentication (Planned)
- JWT-based authentication
- Session management
- Role-based access control

### Input Validation
- All parameters are validated
- SQL injection prevention
- XSS protection

---

## 🚢 Deployment

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

### PM2 (Production)
```bash
pm2 start server.js --name "nps-pam-api"
pm2 save
```

---

## 📝 Logging

### Request Logging
All requests are logged with timestamp and path.

### Error Logging
Errors include stack traces in development mode.

---

## 🧪 Testing

```bash
# Run tests (coming soon)
npm run test

# Test API endpoints
curl http://localhost:5000/api/health
```

---

## 📄 License

MIT License

---

**Built with Express.js**
