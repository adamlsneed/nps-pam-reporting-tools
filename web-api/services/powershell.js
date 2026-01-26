import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to PowerShell reports
const REPORTS_PATH = path.join(__dirname, '../../powershell-reports');
const MODULE_PATH = process.env.NPS_MODULE_PATH || path.join(__dirname, '../../../nps-powershell-module/NPS-Module-Complete.psm1');

export class PowerShellService {
    constructor() {
        this.isConnected = false;
        this.cache = new Map();
        this.cacheTimeout = 60000; // 1 minute cache
    }

    // Execute PowerShell command and return JSON result
    async executePS(script) {
        return new Promise((resolve, reject) => {
            // Use pwsh (PowerShell Core) if available, otherwise powershell
            const shell = process.platform === 'win32' ? 'powershell' : 'pwsh';

            const command = `
        $ErrorActionPreference = 'Stop'
        try {
          ${script}
        } catch {
          Write-Error $_.Exception.Message
          exit 1
        }
      `;

            const ps = spawn(shell, ['-NoProfile', '-NonInteractive', '-Command', command]);

            let stdout = '';
            let stderr = '';

            ps.stdout.on('data', (data) => {
                stdout += data.toString();
            });

            ps.stderr.on('data', (data) => {
                stderr += data.toString();
            });

            ps.on('close', (code) => {
                if (code !== 0) {
                    reject(new Error(stderr || `PowerShell exited with code ${code}`));
                } else {
                    try {
                        // Try to parse as JSON
                        const result = JSON.parse(stdout.trim());
                        resolve(result);
                    } catch {
                        // Return raw output if not JSON
                        resolve({ raw: stdout.trim() });
                    }
                }
            });

            ps.on('error', (err) => {
                reject(err);
            });
        });
    }

    // Get cached data or fetch new
    async getCached(key, fetchFn, timeout = this.cacheTimeout) {
        const cached = this.cache.get(key);
        if (cached && Date.now() - cached.timestamp < timeout) {
            return cached.data;
        }

        const data = await fetchFn();
        this.cache.set(key, { data, timestamp: Date.now() });
        return data;
    }

    // Dashboard data - combines multiple sources
    async getDashboardData() {
        return this.getCached('dashboard', async () => {
            // For now, return mock data (will be replaced with real PS calls)
            return this.getMockDashboardData();
        });
    }

    // Get metrics summary
    async getMetrics() {
        return this.getCached('metrics', async () => {
            try {
                const script = `
          Import-Module "${MODULE_PATH}" -Force
          $resources = Get-NPSManagedResource
          $credentials = Get-NPSCredential
          $sessions = Get-NPSActivitySession
          $policies = Get-NPSAccessControlPolicy
          
          @{
            totalResources = $resources.Count
            totalCredentials = $credentials.Count
            activeSessions = ($sessions | Where-Object { $_.status -eq 1 }).Count
            accessPolicies = $policies.Count
          } | ConvertTo-Json
        `;
                return await this.executePS(script);
            } catch (error) {
                console.warn('Using mock metrics data:', error.message);
                return this.getMockMetrics();
            }
        });
    }

    // Get compliance status
    async getComplianceStatus() {
        return this.getCached('compliance', async () => {
            return this.getMockCompliance();
        });
    }

    // Get security alerts
    async getSecurityAlerts() {
        return this.getCached('alerts', async () => {
            return this.getMockAlerts();
        }, 30000); // 30 second cache for alerts
    }

    // Credential Rotation Report
    async getCredentialRotationReport(options = {}) {
        const cacheKey = `credentials_${JSON.stringify(options)}`;
        return this.getCached(cacheKey, async () => {
            try {
                const script = `
          Import-Module "${MODULE_PATH}" -Force
          # Would run Get-NPSCredentialRotationReport.ps1 with parameters
          # For now, return structured data
          @{ status = 'success'; message = 'Report generated' } | ConvertTo-Json
        `;
                // await this.executePS(script);
                return this.getMockCredentialReport();
            } catch (error) {
                console.warn('Using mock credential data:', error.message);
                return this.getMockCredentialReport();
            }
        }, 120000); // 2 minute cache for reports
    }

    // Dependency Report
    async getDependencyReport(options = {}) {
        const cacheKey = `dependencies_${JSON.stringify(options)}`;
        return this.getCached(cacheKey, async () => {
            return this.getMockDependencyReport();
        }, 120000);
    }

    // User Activity Report
    async getUserActivityReport(options = {}) {
        const cacheKey = `activity_${JSON.stringify(options)}`;
        return this.getCached(cacheKey, async () => {
            return this.getMockActivityReport();
        }, 120000);
    }

    // Mock data methods (used when NPS is not connected)
    getMockDashboardData() {
        return {
            metrics: {
                totalResources: 245,
                totalCredentials: 187,
                activeSessions: 12,
                accessPolicies: 8,
                trends: { resources: 5.2, credentials: 3.1, sessions: -2.8, policies: 0 }
            },
            compliance: {
                score: 83.3,
                maxScore: 100,
                checks: [
                    { label: 'Auto-rotation enabled', value: '76%', passed: true },
                    { label: 'Rotation compliance', value: '222/245', passed: true },
                    { label: 'Access policies active', passed: true },
                    { label: 'After-hours activity', value: '<10%', passed: true },
                    { label: 'Failed sessions', value: '3', passed: true },
                    { label: 'Dormant credentials', value: '12', passed: false }
                ]
            },
            alerts: [
                { severity: 'critical', message: 'Long-running sessions detected', count: 3, time: '5m ago' },
                { severity: 'warning', message: 'Credentials overdue for rotation', count: 23, time: '1h ago' },
                { severity: 'info', message: 'Weekly compliance report ready', time: '3h ago' }
            ],
            topUsers: [
                { rank: 1, name: 'admin_smith', sessions: 42, risk: 'high' },
                { rank: 2, name: 'jdoe', sessions: 31, risk: 'medium' },
                { rank: 3, name: 'sysadmin', sessions: 28, risk: 'low' }
            ],
            topResources: [
                { rank: 1, name: 'DC-PROD-01', sessions: 87, platform: 'Windows' },
                { rank: 2, name: 'DB-PROD', sessions: 65, platform: 'SQL Server' }
            ],
            sessionStats: {
                last24Hours: Array.from({ length: 24 }, (_, i) => ({
                    hour: `${i}:00`,
                    sessions: Math.floor(Math.random() * 30) + 1
                }))
            }
        };
    }

    getMockMetrics() {
        return {
            totalResources: 245,
            totalCredentials: 187,
            activeSessions: 12,
            accessPolicies: 8
        };
    }

    getMockCompliance() {
        return {
            score: 83.3,
            maxScore: 100,
            checks: [
                { label: 'Auto-rotation enabled', value: '76%', passed: true },
                { label: 'Rotation compliance', value: '222/245', passed: true },
                { label: 'Access policies active', passed: true }
            ]
        };
    }

    getMockAlerts() {
        return [
            { severity: 'critical', message: 'Long-running sessions detected', count: 3, time: '5m ago' },
            { severity: 'warning', message: 'Credentials overdue for rotation', count: 23, time: '1h ago' }
        ];
    }

    getMockCredentialReport() {
        return {
            summary: {
                total: 245,
                overdue: 23,
                dueSoon: 45,
                ok: 177,
                complianceRate: 72.24
            },
            data: [
                { name: 'svc_backup', type: 'Service', platform: 'Windows', status: 'OVERDUE', daysAgo: 97 },
                { name: 'admin_db', type: 'User', platform: 'SQL Server', status: 'DUE SOON', daysAgo: 71 }
            ]
        };
    }

    getMockDependencyReport() {
        return {
            summary: {
                total: 47,
                critical: 8,
                high: 12,
                medium: 15,
                low: 12
            },
            data: [
                { name: 'svc_backup', criticality: 'CRITICAL', dependencies: 15, autoRotate: false },
                { name: 'svc_sql', criticality: 'CRITICAL', dependencies: 12, autoRotate: false }
            ]
        };
    }

    getMockActivityReport() {
        return {
            summary: {
                totalUsers: 42,
                highRisk: 5,
                mediumRisk: 12,
                lowRisk: 25
            },
            data: [
                { name: 'admin_smith', sessions: 87, riskLevel: 'HIGH', afterHours: 48.3 },
                { name: 'jdoe', sessions: 65, riskLevel: 'MEDIUM', afterHours: 22.5 }
            ]
        };
    }
}

export default PowerShellService;
