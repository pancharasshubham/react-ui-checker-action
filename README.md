# React UI Checker Action

React UI Checker is a security-focused GitHub Action that scans React projects for common UI mistakes before code is merged.

It helps teams detect problems early in CI instead of discovering them after deployment.

The tool focuses on issues that frequently break production UI, including:

- Tailwind CSS class conflicts
- Accessibility violations (missing alt text, labels, contrast issues)
- Layout overflow and mobile breakpoints
- Common React anti-patterns

The action runs automatically in GitHub CI and produces a clear report in pull requests.

## Design Principles

React UI Checker is built with strict security and reliability goals.

- No remote code execution
- No access to repository secrets
- Locked dependency installation (`npm ci`)
- Minimal dependencies to reduce supply-chain risk
- Deterministic scanning behavior

The action only performs static analysis and does not execute arbitrary code from the repository.

## Usage

Add the action to your workflow:

```yaml
name: UI Check

on: [pull_request]

jobs:
  ui-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: yourusername/react-ui-checker-action@v1
```


## Example Output

```markdown
## Example Output

React UI Checker will report issues directly in CI logs:

Tailwind Conflict Detected
File: components/Button.jsx
Issue: `p-4` and `p-6` used together

Accessibility Issue
File: pages/Home.jsx
Issue: Image missing `alt` attribute
```

## Planned Checks

- Tailwind CSS conflict detection
- Accessibility validation
- Layout overflow detection
- React performance anti-patterns
- Bundle size regression alerts

## Why This Tool Exists

Many UI bugs pass code review because they are visual or subtle. 
Developers only notice them after deployment when users report issues.

React UI Checker shifts UI validation earlier into the CI pipeline so teams can catch these problems before they reach production.

## License

MIT License
