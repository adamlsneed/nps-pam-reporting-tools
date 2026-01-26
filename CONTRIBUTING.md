# Contributing to NPS PAM Reporting Tools

First off, thank you for considering contributing to NPS PAM Reporting Tools! It's people like you that make this project such a great tool.

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

* **Use a clear and descriptive title**
* **Describe the exact steps to reproduce the problem**
* **Provide specific examples**
* **Describe the behavior you observed and what you expected**
* **Include screenshots if relevant**
* **Include your environment details** (PowerShell version, NPS version, OS)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

* **Use a clear and descriptive title**
* **Provide a step-by-step description of the suggested enhancement**
* **Provide specific examples to demonstrate the steps**
* **Describe the current behavior and explain the expected behavior**
* **Explain why this enhancement would be useful**

### Pull Requests

* Fill in the required template
* Do not include issue numbers in the PR title
* Follow the PowerShell style guide
* Include thoughtfully-worded, well-structured tests
* Document new code
* End all files with a newline

## Development Process

### Phase 1: PowerShell Reports (Current)

1. **Fork and Clone**
   ```bash
   git clone https://github.com/YOUR-USERNAME/nps-pam-reporting-tools.git
   cd nps-pam-reporting-tools
   ```

2. **Create a Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make Your Changes**
   - Follow PowerShell best practices
   - Add comment-based help for functions
   - Test your changes thoroughly

4. **Test Your Changes**
   ```powershell
   # Test against a real NPS instance
   Import-Module ../nps-powershell-module/NPS-Module-Complete.psm1
   Connect-NPSServer -Server "..." -Username "..." -Password "..." -MfaCode "..."
   
   # Test your report
   .\powershell-reports\Your-Report.ps1
   ```

5. **Commit Your Changes**
   ```bash
   git add .
   git commit -m "feat: add awesome new feature"
   ```

6. **Push and Create PR**
   ```bash
   git push origin feature/your-feature-name
   ```

### PowerShell Style Guide

* Use approved PowerShell verbs (Get-, Set-, New-, Remove-, etc.)
* Use PascalCase for function names
* Use full parameter names (avoid aliases)
* Include comment-based help for all functions
* Use meaningful variable names
* Keep functions focused and single-purpose
* Handle errors gracefully with try/catch

Example:
```powershell
function Get-SomethingUseful {
    <#
    .SYNOPSIS
        Brief description
    
    .DESCRIPTION
        Detailed description
    
    .PARAMETER Name
        Parameter description
    
    .EXAMPLE
        Get-SomethingUseful -Name "value"
    #>
    [CmdletBinding()]
    param(
        [Parameter(Mandatory = $true)]
        [string]$Name
    )
    
    try {
        # Implementation
    }
    catch {
        Write-Error "Failed to do something: $_"
    }
}
```

## Phase 2+: Web GUI Development

When we move to web development, we'll update this guide with:
* Frontend development guidelines (React/Vue.js)
* Backend API development (ASP.NET Core or Node.js)
* Database schema changes
* API documentation requirements

## Project Structure

```
nps-pam-reporting-tools/
├── powershell-reports/     # PowerShell reporting scripts
├── docs/                   # Documentation
├── examples/               # Example configurations
├── assets/                 # Screenshots, diagrams
└── .github/                # GitHub templates and workflows
```

## Documentation

* Update README.md if you change functionality
* Update ROADMAP.md for significant features
* Add examples to docs/ for new features
* Include screenshots for UI changes (future)

## Testing

### PowerShell Reports
* Test against a live NPS instance
* Verify all export formats (CSV, JSON, HTML)
* Test with different parameter combinations
* Ensure backward compatibility

### Future: Web GUI
* Unit tests for all functions
* Integration tests for API endpoints
* E2E tests for critical user flows
* Performance testing for large datasets

## Commit Message Guidelines

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

* `feat:` New feature
* `fix:` Bug fix
* `docs:` Documentation changes
* `style:` Code style changes (formatting, etc.)
* `refactor:` Code refactoring
* `test:` Adding or updating tests
* `chore:` Maintenance tasks

Examples:
```
feat: add risk score calculation to user activity report
fix: correct dormant credential threshold calculation
docs: update compliance mapping for PCI-DSS
```

## Community

* **Questions?** Open a GitHub Discussion
* **Bugs?** Create an GitHub Issue
* **Ideas?** Start a GitHub Discussion

## Recognition

Contributors will be recognized in:
* README.md Contributors section
* Release notes
* Project documentation

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing! 🎉
