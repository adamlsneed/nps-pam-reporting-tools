# NPS PAM Reporting Tools

[![PowerShell](https://img.shields.io/badge/PowerShell-5.1%2B-blue.svg)](https://docs.microsoft.com/en-us/powershell/)
[![NPS](https://img.shields.io/badge/NPS-v25.9+-green.svg)](https://www.netwrix.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

**Enterprise-grade security reporting tools for Netwrix Privilege Secure (NPS-AM)**

Comprehensive PAM (Privileged Access Management) reporting suite designed for security teams, compliance officers, and IT operations. Built for real-world security monitoring, audit preparation, and executive visibility.

---

## 🎯 Project Vision

**Current State**: Production-ready PowerShell reporting tools  
**Future State**: Modern GUI application with advanced analytics and automation

This repository provides the foundation for enterprise PAM reporting with:
- ✅ **Phase 1 (Current)**: PowerShell reporting scripts - COMPLETE
- 🚧 **Phase 2 (Planned)**: Web-based GUI dashboard
- 🚧 **Phase 3 (Planned)**: Advanced analytics and ML-based anomaly detection
- 🚧 **Phase 4 (Planned)**: Multi-tenant SaaS offering

---

## 📊 Available Reports (PowerShell - Phase 1)

### 1. **Credential Rotation & Lifecycle Report**
`Get-NPSCredentialRotationReport.ps1`

**Purpose**: Track password rotation compliance and credential health

**Key Features**:
- Password rotation status tracking with configurable thresholds
- Dormant credential detection (180+ days)
- Auto-rotation configuration analysis
- Compliance rate calculation
- Platform-based grouping
- Export to CSV, JSON, or HTML

**Use Cases**: Monthly security reviews, audit preparation (SOX, PCI-DSS), password policy compliance

```powershell
# Basic usage
.\powershell-reports\Get-NPSCredentialRotationReport.ps1 -ShowSummary

# Custom threshold with HTML export
.\powershell-reports\Get-NPSCredentialRotationReport.ps1 -RotationThresholdDays 60 -ExportPath "./reports/rotation.html" -Format HTML
```

---

### 2. **Service Account Dependency Map**
`Get-NPSServiceAccountDependencyMap.ps1`

**Purpose**: Map service account dependencies for impact analysis

**Key Features**:
- Service account → system dependency mapping
- Windows Services and Scheduled Tasks detection
- Cross-system impact analysis
- Criticality scoring (LOW/MEDIUM/HIGH/CRITICAL)
- Change impact assessment
- Auto-rotation status tracking

**Use Cases**: Password rotation planning, disaster recovery, change management, incident response

```powershell
# Generate interactive HTML dependency map
.\powershell-reports\Get-NPSServiceAccountDependencyMap.ps1 -ExportPath "./reports/dependencies.html"

# With detailed impact analysis
.\powershell-reports\Get-NPSServiceAccountDependencyMap.ps1 -ShowImpactAnalysis -ExportPath "./reports/dependencies.html"
```

---

### 3. **Privileged User Activity Report**
`Get-NPSPrivilegedUserActivityReport.ps1`

**Purpose**: Analyze privileged user behavior and detect anomalies

**Key Features**:
- Business hours vs. after-hours analysis
- Weekend access tracking
- Risk scoring with 7-point assessment
- Behavioral anomaly detection
- Session duration statistics
- Failed access tracking
- Resource access diversity

**Use Cases**: Security monitoring, insider threat detection, compliance audits, user behavior analysis

```powershell
# 90-day activity analysis with behavioral detection
.\powershell-reports\Get-NPSPrivilegedUserActivityReport.ps1 -Days 90 -IncludeBehavioralAnalysis

# Investigate specific user
.\powershell-reports\Get-NPSPrivilegedUserActivityReport.ps1 -UserFilter "admin" -ExportPath "./reports/admin_activity.html"
```

---

### 4. **PAM Executive Dashboard**
`Get-NPSPAMDashboard.ps1`

**Purpose**: Real-time comprehensive PAM health overview

**Key Features**:
- Live system health monitoring
- Key metric widgets (resources, credentials, sessions, policies)
- 6-point compliance score calculation
- 24-hour activity summary
- Security alert detection
- Top users and resources analysis
- Auto-refresh capability for SOC dashboards

**Use Cases**: Executive briefings, SOC monitoring, daily operations, compliance reporting

```powershell
# Static dashboard
.\powershell-reports\Get-NPSPAMDashboard.ps1 -ExportPath "./reports/dashboard.html"

# Auto-refreshing dashboard (updates every 5 minutes)
.\powershell-reports\Get-NPSPAMDashboard.ps1 -ExportPath "./reports/dashboard.html" -RefreshInterval 300
```

---

## 🚀 Quick Start

### Prerequisites
- PowerShell 5.1+ (PowerShell 7+ recommended)
- Network access to NPS server
- NPS credentials with appropriate permissions
- [NPS PowerShell Module](https://github.com/adamlsneed/nps-powershell-module) installed

### Installation

```powershell
# Clone the repository
git clone https://github.com/adamlsneed/nps-pam-reporting-tools.git
cd nps-pam-reporting-tools

# Install NPS PowerShell Module (if not already installed)
git clone https://github.com/adamlsneed/nps-powershell-module.git ../nps-powershell-module

# Connect to NPS (required before running reports)
Import-Module ../nps-powershell-module/NPS-Module-Complete.psm1
Connect-NPSServer -Server "https://nps.company.com:6500" `
                  -Username "domain\user" `
                  -Password "password" `
                  -MfaCode "123456" `
                  -SkipCertificateCheck
```

### Running Your First Report

```powershell
# Generate executive dashboard
.\powershell-reports\Get-NPSPAMDashboard.ps1 -ExportPath "./my-dashboard.html"

# The dashboard will open automatically in your browser
```

---

## 📁 Project Structure

```
nps-pam-reporting-tools/
├── powershell-reports/          # Current PowerShell reporting scripts
│   ├── Get-NPSCredentialRotationReport.ps1
│   ├── Get-NPSServiceAccountDependencyMap.ps1
│   ├── Get-NPSPrivilegedUserActivityReport.ps1
│   └── Get-NPSPAMDashboard.ps1
├── docs/                        # Documentation
│   ├── USAGE_GUIDE.md
│   ├── COMPLIANCE_MAPPING.md
│   └── API_REFERENCE.md
├── examples/                    # Example configurations and workflows
│   ├── automation/
│   ├── scheduled-tasks/
│   └── integration/
├── assets/                      # Screenshots, diagrams, templates
│   ├── screenshots/
│   └── templates/
├── .github/                     # GitHub Actions and templates
│   └── workflows/
├── README.md                    # This file
├── LICENSE                      # MIT License
└── ROADMAP.md                   # Future development plans
```

---

## 📖 Documentation

### Current Documentation (Phase 1)
- **[Usage Guide](docs/USAGE_GUIDE.md)**: Complete parameter reference and examples
- **[Compliance Mapping](docs/COMPLIANCE_MAPPING.md)**: NIST, SOX, PCI-DSS, ISO 27001 alignment
- **[API Reference](docs/API_REFERENCE.md)**: Technical specifications

### Planned Documentation (Phase 2+)
- GUI User Guide
- API Documentation for web interface
- Developer Guide for contributions
- Architecture & Design Documents

---

## 🎯 Use Cases & Scenarios

### Scenario 1: Quarterly Security Review
```powershell
# Generate comprehensive report package
$date = Get-Date -Format "yyyy-MM-dd"
$outDir = "./quarterly-review-$date"
New-Item -Path $outDir -ItemType Directory -Force

.\powershell-reports\Get-NPSCredentialRotationReport.ps1 -ExportPath "$outDir/credential-rotation.html" -Format HTML
.\powershell-reports\Get-NPSServiceAccountDependencyMap.ps1 -ExportPath "$outDir/dependencies.html" -ShowImpactAnalysis
.\powershell-reports\Get-NPSPrivilegedUserActivityReport.ps1 -Days 90 -ExportPath "$outDir/user-activity.html" -IncludeBehavioralAnalysis
.\powershell-reports\Get-NPSPAMDashboard.ps1 -ExportPath "$outDir/dashboard.html"
```

### Scenario 2: SOC Real-Time Monitoring
```powershell
# Deploy to web server with auto-refresh
.\powershell-reports\Get-NPSPAMDashboard.ps1 `
    -ExportPath "C:\inetpub\wwwroot\soc\pam-dashboard.html" `
    -RefreshInterval 300  # Updates every 5 minutes
```

### Scenario 3: Audit Preparation (SOX, PCI-DSS)
```powershell
# Generate audit-ready reports
.\powershell-reports\Get-NPSCredentialRotationReport.ps1 -ExportPath "./audit/credentials.csv" -Format CSV
.\powershell-reports\Get-NPSPrivilegedUserActivityReport.ps1 -Days 365 -ExportPath "./audit/activity.json" -Format JSON
```

### Scenario 4: Security Incident Investigation
```powershell
# Investigate suspicious user activity
.\powershell-reports\Get-NPSPrivilegedUserActivityReport.ps1 `
    -UserFilter "jsmith" `
    -IncludeBehavioralAnalysis `
    -ExportPath "./investigation/jsmith-activity.html"
```

### Scenario 5: Password Rotation Planning
```powershell
# Identify rotation needs and dependencies
.\powershell-reports\Get-NPSCredentialRotationReport.ps1 -RotationThresholdDays 60 -ShowSummary
.\powershell-reports\Get-NPSServiceAccountDependencyMap.ps1 -ShowImpactAnalysis
```

---

## 🔐 Compliance & Security

### Compliance Framework Support

| Framework | Coverage | Reports |
|-----------|----------|---------|
| **NIST CSF** | Identify, Protect, Detect, Respond | All 4 reports |
| **SOX** | Access controls, change management, audit trails | User Activity, Credential Rotation |
| **PCI-DSS** | Req 7 (Access), Req 8 (Auth), Req 10 (Logging) | All 4 reports |
| **ISO 27001** | A.9.2.3, A.9.4.1, A.12.4.1 | All 4 reports |
| **HIPAA** | Access controls, audit controls | User Activity, Dashboard |

### Security Features
- ✅ Behavioral anomaly detection
- ✅ After-hours access tracking
- ✅ Failed session monitoring
- ✅ Dormant credential detection
- ✅ Risk-based user scoring
- ✅ Extended session alerts

---

## 🗺️ Roadmap

### Phase 1: PowerShell Reports ✅ COMPLETE
- [x] Credential Rotation Report
- [x] Service Account Dependency Map
- [x] Privileged User Activity Report
- [x] PAM Executive Dashboard
- [x] Comprehensive documentation
- [x] Compliance mappings

### Phase 2: Web-Based GUI (Q2 2026)
- [ ] Modern web interface (React/Vue.js)
- [ ] Real-time dashboard updates
- [ ] Interactive visualizations (charts, graphs)
- [ ] Report scheduling and automation
- [ ] Email notification system
- [ ] RESTful API backend

### Phase 3: Advanced Analytics (Q3 2026)
- [ ] Machine learning-based anomaly detection
- [ ] Predictive analytics for security risks
- [ ] Trend analysis and forecasting
- [ ] Advanced behavioral profiling
- [ ] Integration with SIEM platforms

### Phase 4: Enterprise Features (Q4 2026)
- [ ] Multi-tenant support
- [ ] Role-based access control (RBAC)
- [ ] Custom report builder
- [ ] White-label capabilities
- [ ] Mobile application

---

## 💡 Examples & Templates

See the `/examples` directory for:
- Automated report generation scripts
- Scheduled task configurations
- Integration with popular tools (Splunk, Power BI, ServiceNow)
- Custom report templates
- PowerShell workflow examples

---

## 🤝 Contributing

We welcome contributions! Whether you're:
- Reporting bugs
- Suggesting new features
- Improving documentation
- Submitting code changes

Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

---

## 📊 Report Outputs

### Sample Metrics

**Credential Rotation Report**:
- Total credentials analyzed
- Rotation compliance percentage
- Overdue/Due Soon/OK breakdown
- Dormant and never-used accounts
- Average rotation age

**Service Account Dependencies**:
- Critical/High/Medium/Low account counts
- Total dependencies per account
- Impact analysis for password changes
- Auto-rotation status

**User Activity Report**:
- High/Medium/Low risk user counts
- After-hours session percentage
- Weekend access patterns
- Failed session attempts
- Behavioral risk scores

**PAM Dashboard**:
- 6-point compliance score
- Active session count
- Security alerts
- Top users and resources
- 24-hour activity summary

---

## 🙏 Acknowledgments

- Built for the **Netwrix Privilege Secure** (NPS-AM) platform
- Designed with input from security teams and compliance officers
- Aligned with industry best practices and regulatory requirements

---

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/adamlsneed/nps-pam-reporting-tools/issues)
- **Discussions**: [GitHub Discussions](https://github.com/adamlsneed/nps-pam-reporting-tools/discussions)
- **Documentation**: [Wiki](https://github.com/adamlsneed/nps-pam-reporting-tools/wiki)

---

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## ⚠️ Disclaimer

This is an independent community project. Not affiliated with or endorsed by Netwrix Corporation.

---

**Status**: Phase 1 Complete ✅ | Production Ready  
**Version**: 1.0.0  
**Last Updated**: January 25, 2026  
**Next Milestone**: Web GUI Development (Phase 2)
