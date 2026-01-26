# Compliance Framework Mapping

## Overview
This document maps NPS PAM Reporting Tools features to major compliance frameworks and regulatory requirements.

---

## NIST Cybersecurity Framework

### Identify (ID)
**Asset Management**
- ID.AM-2: Software platforms and applications are inventoried
  - **Report**: Service Account Dependency Map
  - **Coverage**: Complete inventory of service accounts and their platform assignments

- ID.AM-5: Resources are prioritized based on criticality
  - **Report**: Service Account Dependency Map (Criticality Scoring)
  - **Coverage**: Automatic criticality assessment (CRITICAL/HIGH/MEDIUM/LOW)

**Risk Assessment**
- ID.RA-1: Asset vulnerabilities are identified and documented
  - **Report**: Credential Rotation Report
  - **Coverage**: Identifies dormant credentials, overdue rotations, missing auto-rotation

---

### Protect (PR)
**Identity Management & Access Control**
- PR.AC-1: Identities and credentials are issued, managed, verified, revoked for authorized devices, users and processes
  - **Report**: Credential Rotation Report
  - **Coverage**: Complete credential lifecycle tracking

- PR.AC-4: Access permissions and authorizations are managed, incorporating the principles of least privilege and separation of duties
  - **Report**: Privileged User Activity Report
  - **Coverage**: Tracks who has access to what and how they're using it

**Data Security**
- PR.DS-5: Protections against data leaks are implemented
  - **Report**: Privileged User Activity Report (Behavioral Analysis)
  - **Coverage**: Detects abnormal access patterns that could indicate data exfiltration

---

### Detect (DE)
**Anomalies & Events**
- DE.AE-2: Detected events are analyzed to understand attack targets and methods
  - **Report**: Privileged User Activity Report
  - **Coverage**: Risk scoring, behavioral analysis, after-hours detection

- DE.AE-3: Event data are collected and correlated from multiple sources and sensors
  - **Report**: PAM Dashboard
  - **Coverage**: Aggregates data from sessions, credentials, resources, policies

**Continuous Monitoring**
- DE.CM-1: Network monitored to detect potential cybersecurity events
  - **Report**: PAM Dashboard (Auto-Refresh)
  - **Coverage**: Real-time monitoring with configurable refresh intervals

- DE.CM-3: Personnel activity is monitored to detect potential cybersecurity events
  - **Report**: Privileged User Activity Report
  - **Coverage**: Comprehensive user behavior monitoring and anomaly detection

---

### Respond (RS)
**Analysis**
- RS.AN-1: Notifications from detection systems are investigated
  - **Report**: Privileged User Activity Report
  - **Coverage**: High-risk user identification and detailed activity analysis

**Mitigation**
- RS.MI-3: Newly identified vulnerabilities are mitigated or documented as accepted risks
  - **Report**: Credential Rotation Report
  - **Coverage**: Identifies credentials needing rotation, dormant accounts

---

## SOX (Sarbanes-Oxley) Compliance

### Section 302: Corporate Responsibility for Financial Reports
**Requirement**: Establish and maintain internal controls over financial reporting

**Coverage**:
- **Access Control Policies**
  - Report: Privileged User Activity Report
  - Evidence: Who accessed financial systems and when

- **Segregation of Duties**
  - Report: Service Account Dependency Map
  - Evidence: Service account usage across different systems

---

### Section 404: Management Assessment of Internal Controls
**Requirement**: Document and test internal controls

**Coverage**:
- **Access Reviews**
  - Report: Privileged User Activity Report
  - Evidence: Regular review of who has privileged access

- **Password Policy Compliance**
  - Report: Credential Rotation Report
  - Evidence: Automated tracking of password rotation compliance

- **Audit Trail**
  - Report: All Reports
  - Evidence: Complete audit trail of privileged access

---

### SOX IT General Controls (ITGCs)
**Access to Programs and Data**
- Report: Privileged User Activity Report
- Evidence: Comprehensive logging of all privileged access

**Change Management**
- Report: Service Account Dependency Map
- Evidence: Impact analysis before credential changes

**Computer Operations**
- Report: PAM Dashboard
- Evidence: Operational monitoring and health checks

---

## PCI-DSS (Payment Card Industry Data Security Standard)

### Requirement 7: Restrict Access to Cardholder Data by Business Need to Know

**7.1**: Limit access to system components and cardholder data to only those whose job requires such access
- **Report**: Privileged User Activity Report
- **Coverage**: Tracks who accesses what resources and identifies over-privileged users

**7.2**: Establish an access control system
- **Report**: PAM Dashboard (Compliance Score - Access Policies)
- **Coverage**: Verifies access control policies are in place

---

### Requirement 8: Identify and Authenticate Access to System Components

**8.2**: In addition to assigning a unique ID, ensure proper user-authentication management
- **Report**: Credential Rotation Report
- **Coverage**: Tracks credential lifecycle and rotation compliance

**8.2.3**: Passwords/passphrases must meet minimum strength requirements
**8.2.4**: Change user passwords at least every 90 days
- **Report**: Credential Rotation Report
- **Coverage**: Configurable rotation threshold (default 90 days), identifies overdue rotations

**8.3**: Secure all individual non-console administrative access and all remote access
- **Report**: Privileged User Activity Report
- **Coverage**: After-hours access tracking, session monitoring

---

### Requirement 10: Track and Monitor All Access to Network Resources and Cardholder Data

**10.1**: Implement audit trails to link all access to system components
- **Report**: All Reports
- **Coverage**: Comprehensive audit trail of all privileged access

**10.2**: Implement automated audit trails
**10.3**: Record audit trail entries for all system components
- **Report**: PAM Dashboard, Privileged User Activity Report
- **Coverage**: Automated collection and reporting of all privileged access

**10.6**: Review logs and security events for all system components
- **Report**: Privileged User Activity Report
- **Coverage**: Automated analysis with risk scoring and anomaly detection

---

## ISO/IEC 27001:2013

### A.9.2: User Access Management

**A.9.2.1**: User registration and de-registration
- **Report**: Credential Rotation Report
- **Coverage**: Tracks credential lifecycle, identifies dormant accounts

**A.9.2.2**: User access provisioning
- **Report**: Privileged User Activity Report
- **Coverage**: Monitors what access users actually use

**A.9.2.3**: Management of privileged access rights
- **Report**: All Reports (Primary Purpose)
- **Coverage**: Complete PAM visibility and compliance

**A.9.2.4**: Management of secret authentication information of users
- **Report**: Credential Rotation Report
- **Coverage**: Password rotation tracking and compliance

**A.9.2.6**: Removal or adjustment of access rights
- **Report**: Credential Rotation Report (Dormant Detection)
- **Coverage**: Identifies accounts that should be disabled

---

### A.9.4: System and Application Access Control

**A.9.4.1**: Information access restriction
- **Report**: Privileged User Activity Report
- **Coverage**: Tracks who accesses what and detects over-access

**A.9.4.4**: Use of privileged utility programs
- **Report**: Privileged User Activity Report
- **Coverage**: Monitors privileged activity execution

**A.9.4.5**: Access control to program source code
- **Report**: Service Account Dependency Map
- **Coverage**: Tracks service accounts used by development systems

---

### A.12.4: Logging and Monitoring

**A.12.4.1**: Event logging
- **Report**: All Reports
- **Coverage**: Comprehensive event logging for all privileged access

**A.12.4.3**: Administrator and operator logs
- **Report**: Privileged User Activity Report
- **Coverage**: Detailed logging of all administrative activity

**A.12.4.4**: Clock synchronization
- **Report**: PAM Dashboard (System Health)
- **Coverage**: Verifies system health including time synchronization

---

## HIPAA (Health Insurance Portability and Accountability Act)

### Access Control (164.312(a)(1))
**Required**: Implement technical policies and procedures for electronic information systems

**Coverage**:
- **164.312(a)(1)**: Unique user identification
  - Report: Privileged User Activity Report
  - Evidence: Individual user activity tracking

- **164.312(a)(2)(iii)**: Encryption and decryption
  - Report: Credential Rotation Report (Auto-rotation)
  - Evidence: Secure credential management

---

### Audit Controls (164.312(b))
**Required**: Implement hardware, software, and procedural mechanisms that record and examine activity

**Coverage**:
- Report: All Reports
- Evidence: Comprehensive audit trail of all privileged access to ePHI systems

---

### Person or Entity Authentication (164.312(d))
**Required**: Implement procedures to verify that a person or entity seeking access is the one claimed

**Coverage**:
- Report: Privileged User Activity Report
- Evidence: Session tracking, MFA verification (via NPS)

---

## GDPR (General Data Protection Regulation)

### Article 32: Security of Processing
**Required**: Implement appropriate technical and organizational measures to ensure a level of security

**Coverage**:
- **Access Control**: Privileged User Activity Report
- **Logging & Monitoring**: All Reports
- **Regular Security Assessment**: Compliance Dashboard

---

### Article 33: Notification of Personal Data Breach
**Required**: Document breaches and demonstrate swift detection

**Coverage**:
- Report: Privileged User Activity Report (Anomaly Detection)
- Evidence: Failed access attempts, unusual access patterns

---

## Compliance Reporting Recommendations

### Daily
- **PAM Dashboard**: Operational health and security alerts
- **Purpose**: Early detection of security incidents

### Weekly
- **Privileged User Activity Report**: Recent user behavior analysis
- **Purpose**: Trend analysis and anomaly detection

### Monthly
- **Credential Rotation Report**: Password compliance status
- **Purpose**: Ensure password policy compliance
- **Privileged User Activity Report**: 30-day activity summary
- **Purpose**: Monthly security review

### Quarterly
- **All Reports**: Complete audit package
- **Purpose**: Quarterly security and compliance review
- **Service Account Dependency Map**: Infrastructure mapping
- **Purpose**: Disaster recovery and change management planning

### Annually
- **Complete Audit Package**: All reports for full year
- **Purpose**: Annual compliance certification (SOX 404, ISO 27001, etc.)

---

## Audit Evidence

### What to Provide Auditors

**For SOX Audits**:
1. Credential Rotation Report (monthly for full year)
2. Privileged User Activity Report (showing access reviews)
3. Service Account Dependency Map (change management evidence)

**For PCI-DSS Audits**:
1. Credential Rotation Report (showing 90-day compliance)
2. Privileged User Activity Report (showing access restriction)
3. PAM Dashboard (showing continuous monitoring)

**For ISO 27001 Audits**:
1. All four reports (quarterly)
2. Compliance Dashboard showing consistent scores
3. Evidence of regular security reviews

---

## Report-to-Control Mapping Matrix

| Control | Credential Rotation | Dependency Map | User Activity | PAM Dashboard |
|---------|--------------------:|---------------:|--------------:|--------------:|
| **Access Control** | ✓ | ✓ | ✓✓✓ | ✓ |
| **Password Management** | ✓✓✓ | - | - | ✓ |
| **Audit Logging** | ✓ | ✓ | ✓✓✓ | ✓ |
| **Change Management** | ✓ | ✓✓✓ | - | - |
| **Risk Assessment** | ✓✓ | ✓✓ | ✓✓✓ | ✓✓ |
| **Incident Response** | ✓ | ✓✓ | ✓✓✓ | ✓✓ |
| **Compliance Monitoring** | ✓✓ | ✓ | ✓✓ | ✓✓✓ |

✓ = Supported  
✓✓ = Primary support  
✓✓✓ = Comprehensive support

---

**Last Updated**: January 25, 2026  
**Review Frequency**: Quarterly  
**Next Review**: April 2026
