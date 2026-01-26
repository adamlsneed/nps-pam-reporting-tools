# NPS PAM Web UI

Modern React-based dashboard for NPS PAM Reporting Tools.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm 9+

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Development URLs
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

---

## 📁 Project Structure

```
web-ui/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── AlertPanel.jsx
│   │   ├── ComplianceGauge.jsx
│   │   ├── DataTable.jsx
│   │   ├── MetricCard.jsx
│   │   └── Navigation.jsx
│   ├── pages/               # Page components
│   │   ├── Dashboard.jsx
│   │   ├── CredentialReport.jsx
│   │   ├── DependencyReport.jsx
│   │   ├── UserActivityReport.jsx
│   │   └── Settings.jsx
│   ├── services/            # API and data services
│   │   ├── api.js           # Axios API service
│   │   └── mockData.js      # Development mock data
│   ├── utils/               # Utility functions
│   ├── App.jsx              # Main app component
│   ├── App.css
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles
├── index.html
├── package.json
└── vite.config.js
```

---

## 🎨 Design System

### Colors
```css
--primary: #667eea      /* Purple - Primary actions */
--primary-dark: #764ba2 /* Dark purple - Hover states */
--secondary: #f093fb    /* Pink - Accents */
--accent: #4facfe       /* Blue - Highlights */
--success: #10b981      /* Green - Positive states */
--warning: #f59e0b      /* Orange - Caution */
--danger: #ef4444       /* Red - Errors/Critical */
--info: #3b82f6         /* Blue - Information */
```

### Typography
- **Font**: Inter (Google Fonts)
- **Headings**: 600-700 weight
- **Body**: 400-500 weight

### Dark Theme
- **Background Primary**: #0f172a
- **Background Secondary**: #1e293b
- **Text Primary**: #f1f5f9
- **Text Muted**: #94a3b8

---

## 📊 Pages

### 1. Dashboard (`/`)
Main overview with:
- Key metrics (Resources, Credentials, Sessions, Policies)
- Compliance score gauge
- Security alerts panel
- 24-hour session activity chart
- Top users and resources tables

### 2. Credential Rotation (`/credentials`)
Password rotation compliance:
- Status metrics (Overdue, Due Soon, OK)
- Compliance rate visualization
- Credential details table
- Export functionality

### 3. Service Account Dependencies (`/dependencies`)
Dependency mapping:
- Criticality distribution chart
- Service account cards with expand/collapse
- Dependent systems visualization
- Impact analysis table

### 4. User Activity (`/activity`)
Behavioral analysis:
- Risk distribution chart
- Activity statistics
- User details with risk factors
- After-hours and weekend tracking

### 5. Settings (`/settings`)
Configuration:
- NPS server connection
- Report thresholds
- Notification settings
- Appearance options

---

## 🔌 API Integration

### Using Mock Data (Development)
```javascript
import { api } from './services/mockData'

const data = await api.getDashboard()
```

### Using Real API (Production)
```javascript
import apiService from './services/api'

const data = await apiService.getDashboard()
```

### API Endpoints Expected
```
GET /api/health
GET /api/dashboard
GET /api/dashboard/metrics
GET /api/dashboard/compliance
GET /api/dashboard/alerts
GET /api/reports/credentials
GET /api/reports/dependencies
GET /api/reports/activity
```

---

## 🛠️ Components

### MetricCard
```jsx
<MetricCard
  icon="🔑"
  value={187}
  label="Total Credentials"
  trend={5.2}
  trendLabel="vs last month"
  color="primary"  // primary | success | warning | danger
/>
```

### ComplianceGauge
```jsx
<ComplianceGauge
  score={83.3}
  maxScore={100}
  checks={[
    { label: 'Auto-rotation enabled', value: '76%', passed: true },
    { label: 'Rotation compliance', passed: false }
  ]}
/>
```

### AlertPanel
```jsx
<AlertPanel alerts={[
  { severity: 'critical', message: 'Long-running sessions', count: 3, time: '5m ago' },
  { severity: 'warning', message: 'Credentials overdue', count: 23, time: '1h ago' }
]} />
```

### DataTable
```jsx
<DataTable
  title="Top Users"
  columns={[
    { key: 'name', label: 'User' },
    { key: 'sessions', label: 'Sessions' },
    { key: 'risk', label: 'Risk', render: (val) => <Badge>{val}</Badge> }
  ]}
  data={users}
  maxRows={5}
/>
```

---

## 🎯 Features

### Current Features
- [x] Responsive dark theme
- [x] Interactive dashboard
- [x] Credential rotation report
- [x] Dependency mapping
- [x] User activity analysis
- [x] Settings configuration
- [x] Mock data for development
- [x] API service layer

### Planned Features
- [ ] Real-time updates via WebSocket
- [ ] Report export (PDF/CSV)
- [ ] Light theme option
- [ ] User authentication
- [ ] Report scheduling
- [ ] Email notifications
- [ ] Advanced charts (Recharts)

---

## 🔧 Configuration

### Environment Variables
Create `.env.local` for local development:

```env
VITE_API_URL=http://localhost:5000/api
VITE_APP_TITLE=NPS PAM Reporting
```

### Vite Configuration
See `vite.config.js` for:
- API proxy settings
- Build configuration
- Plugin setup

---

## 📦 Dependencies

### Production
- `react` - UI library
- `react-dom` - React DOM renderer
- `react-router-dom` - Routing
- `recharts` - Charts (optional)
- `axios` - HTTP client

### Development
- `vite` - Build tool
- `@vitejs/plugin-react` - React plugin

---

## 🚢 Deployment

### Build for Production
```bash
npm run build
```

### Output
Build files are generated in `dist/` directory.

### Deploy Options
- **Static hosting**: Netlify, Vercel, GitHub Pages
- **Docker**: Use provided Dockerfile
- **IIS**: Deploy to Windows Server

---

## 🧪 Testing

### Run Tests (Coming Soon)
```bash
npm run test
```

### E2E Tests (Coming Soon)
```bash
npm run test:e2e
```

---

## 📝 Code Style

### ESLint
```bash
npm run lint
```

### Prettier
```bash
npm run format
```

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Make changes
4. Test thoroughly
5. Submit PR

---

## 📄 License

MIT License - see LICENSE file

---

**Built with ❤️ using React + Vite**
