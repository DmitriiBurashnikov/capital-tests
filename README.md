# Capital.com Automation Tests

End-to-end (UI) and API automation tests built with Playwright and TypeScript.
UI tests target [Capital.com](https://capital.com); API tests run against JSONPlaceholder (a public API used for practice).

The suite contains **24 tests** across 5 spec files, running on 3 browsers (Chromium, Firefox, WebKit) — 72 test runs in total. It follows the Page Object Model (POM) architecture and is integrated with GitHub Actions CI/CD.

## Tech Stack
- Playwright
- TypeScript
- GitHub Actions (CI/CD)

## Test Coverage

**UI (E2E) tests — Capital.com:**
- **Login** — positive and negative scenarios (invalid email, too long email, email with gaps, valid email + invalid password, spaces in fields), refactored into a data-driven approach
- **Trading** — Trade CFDs, Knock-outs, Demo account, Pro account pages
- **Platforms** — Web platform, Mobile app, TradingView, MT4, MT5, API access pages
- **Learn** — Trading strategies, Technical analysis, Trading psychology, All resources pages

**API tests — JSONPlaceholder (practice):**
- GET users list returns 200
- GET single user returns correct data

## Architecture
- **Page Object Model (POM)** — page interactions are encapsulated in dedicated page classes for maintainability and reuse
- **Cross-browser** — tests run on Chromium, Firefox, and WebKit
- **Data-driven tests** — negative login cases are generated from a data array, with per-case browser skips (`skipBrowsers`) to handle browser-specific behavior
- **.env** — test credentials are managed via environment variables and are not committed to the repository

## How to Run

Install dependencies:
```bash
npm install
```

Run all tests:
```bash
npx playwright test
```

Run with the browser visible:
```bash
npx playwright test --headed
```

Run a specific file:
```bash
npx playwright test tests/login.spec.ts
```

List all tests without running them:
```bash
npx playwright test --list
```

## CI/CD
Tests run automatically on every push via **GitHub Actions**. Test credentials are stored securely using **GitHub Secrets**, so no sensitive data is exposed in the repository.

## Known Issues
Capital.com uses anti-bot protection that can block automated interaction on certain browsers. Affected login cases are consciously skipped per-browser via a `skipBrowsers` field in the test data, rather than being hidden — this keeps the suite green while documenting the limitation.