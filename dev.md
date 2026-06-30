# Developer Guide – kschema-fs-api-gen-post-actions

This guide describes the code architecture, library entry point, file structure, and local development/testing workflows for developers contributing to `kschema-fs-api-gen-post-actions`.

---

## Library Architecture Overview

The package is a programmatic Node.js ES module that dynamically resolves the active generator tasks from the latest version folder (e.g. `v14`), loading actions dynamically. It does not run via a CLI wrapper.

```text
Programmatic Invocation (index.js)
             │
             ├──► Loads getLatestVersion() (resolves e.g. "v14")
             │
             ├─► [withMail]    ──► (bin/v14/tasks/actions/withMail.js)
             ├─► [insertGenPk] ──► (bin/v14/tasks/actions/insertGenPk.js)
             ├─► [insertAsIs]  ──► (bin/v14/tasks/actions/insertAsIs.js)
             ├─► [filter]      ──► (bin/v14/tasks/actions/filter.js)
             └─► [groupBy]     ──► (bin/v14/tasks/actions/groupBy.js)
```

Each action module encapsulates its template files, file creation logic, target folder validation, and integration behavior.

---

## Directory Structure

```text
kschema-fs-api-gen-post-actions/
 ├── index.js                      # Programmatic API entrypoint
 ├── package.json                  # ESM package metadata and dependencies
 └── bin/                          # Code generation execution logic
      ├── core/
      │    └── getLatestVersion.js # Checks latest version directory (e.g., v14)
      └── v14/                     # Active version 14 runtime
           ├── core/
           │    └── createFolder.js # Helper utility to copy templates
           └── tasks/
                ├── common/
                │    └── updateEndPointsJs.js
                └── actions/
                     ├── filter.js
                     ├── Filter/   # Scaffolding templates for Filter
                     ├── insertAsIs.js
                     ├── InsertAsIs/
                     ├── insertGenPk.js
                     ├── InsertGenPk/
                     ├── withMail.js
                     ├── WithMail/
                     ├── groupBy.js
                     └── groupBy/
```

---

## Key Dependencies

The generation process delegates core router editing and additional database REST actions to other KeshavSoft utility libraries:
- **`express-fix-endpoints-post-js`**: Safely parses and injects ES imports and route handlers into the consumer's `end-points.js` file.
- **`kschema-fs-api-gen-rest`**: Scaffolds full CRUD/REST api schema actions when requested via optional generation flags.

---

## Templates & Helpers

- **Helper Utilities**: Shared functions such as `createFolder` are located in `bin/v14/core/createFolder.js`. Action step files import them using relative paths.
- **Templates Isolation**: The `template/` folder within each action folder contains the boilerplate structure for the controller, DAL, route validation, and schema definitions that are copied to the destination project.

---

## Local Development & Testing

Use the `test/` directory to run actions locally:

```bash
# Run a specific action test runner
node test/v4/InsertAsIs/test.js
node test/v4/groupBy/test.js
```

Each test script calls the module's programmatic exports in `index.js` against dummy endpoint files to confirm correct templates generation and integration.
