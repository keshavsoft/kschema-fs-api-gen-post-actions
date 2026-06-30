# Internal Developer Guide – CI/CD & NPM Publishing

This document outlines the internal workflow and CI/CD jobs configured for the `kschema-fs-api-gen-post-actions` repository.

---

## CI/CD Workflow Overview

We use **GitHub Actions** to automate version validation and public package publishing. This guarantees that releases are safe and only deployed when version bumps are explicitly declared.

```text
Developer pushes to main
          │
          ├──► Runs "NPM Version Check" (Informational)
          │
          └──► Runs "NPM Publish"
                   │
                   ▼ Compares local vs remote
             Is local version ahead?
             ├── [Yes] ──► Authenticates with NPM_TOKEN ──► npm publish
             └── [No]  ──► Skips publish (Graceful exit)
```

---

## CI/CD Jobs & Actions

The workflows are located in the `.github/workflows/` directory:

### 1. NPM Version Check (`npm-version-check.yml`)
Runs automatically on:
- Pushes to `main`
- Pull requests to `main`
- Manual trigger (`workflow_dispatch`)

**Actions performed**:
- Sets up Node.js v20.
- Reads local version from `package.json`.
- Queries npm registry for the published version of `kschema-fs-api-gen-post-actions`.
- Compares versions and prints a clear summary (`AHEAD`, `BEHIND`, or `EQUAL`).

---

### 2. NPM Publish (`npm-publish.yml`)
Runs automatically on:
- Pushes to `main`
- Manual trigger (`workflow_dispatch`)

**Actions performed**:
- Compares local package version against published npm version.
- If the local version is **ahead** of the remote npm version:
  - Authenticates with the npm registry using the repository secret `NPM_TOKEN`.
  - Runs `npm publish` to deploy the package to the public registry.
- If the local version is **not ahead** (equal or behind), it prints a skip message and exits gracefully without publishing.

---

## Release Procedure (For In-House Developers)

To release a new version of the package to npm:

1. **Commit and Test Changes**:
   Ensure all changes are thoroughly tested locally using the test harness:
   ```bash
   node test/v4/InsertAsIs/test.js
   ```
2. **Bump Package Version**:
   Increment the version number in `package.json` using npm standard commands:
   ```bash
   # Bumps patch version: 1.15.1 -> 1.15.2
   npm version patch

   # Bumps minor version: 1.15.1 -> 1.16.0
   npm version minor
   ```
3. **Push to Remote**:
   Push the commit and the version bump tag to the remote repository:
   ```bash
   git push origin main --tags
   ```
4. **Automated Publish**:
   The `NPM Publish` workflow will trigger automatically. Since the version is now higher than the one on npm, it will publish the package to NPM within seconds.

---

## Required Secret Reference

- **`NPM_TOKEN`**: A deployment token from npmjs.com with automation permissions. Configure it in your repository under **Settings > Secrets and variables > Actions > Secrets**.
