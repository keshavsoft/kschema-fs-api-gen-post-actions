# kschema-fs-api-gen-post-actions

A configuration-driven scaffolding library to instantly generate Express.js POST API actions.

This package automatically generates boilerplate code (controllers, data access layers, routes, and validation schemas) and registers the newly created routes directly into your `end-points.js` file.

> [!NOTE]
> This package is a **programmatic-only** library. It is designed to be imported and executed inside your scripts, automation tasks, or build pipelines, and does not provide a command-line interface (CLI).

---

## Installation

```bash
npm install kschema-fs-api-gen-post-actions
```

---

## Programmatic API Usage

Import and call the action generators directly in your scripts:

```javascript
import { 
  withMail, 
  insertGenPk, 
  insertAsIs, 
  filter, 
  groupBy 
} from 'kschema-fs-api-gen-post-actions';

// Example: Generate a standard insert action
await insertAsIs({
  toPath: './src/api',            // Target directory containing your end-points.js
  inFolderName: 'InsertAsIs',      // Folder name to generate under the target directory
  inGenerateRest: false           // Whether to generate REST specifications
});
```

### Available Generator Functions

Each function accepts a configuration object containing path specifications and generation options:

1. **`withMail`**: Generates a POST action with email sending logic.
2. **`insertGenPk`**: Generates an insert action with an automatically generated primary key.
3. **`insertAsIs`**: Generates a standard insert action without modifying or generating the primary key.
4. **`filter`**: Generates a filter/query action.
5. **`groupBy`**: Generates a database grouping/aggregation action.

---

## Output Structure

When any generator function executes successfully, it scaffolds a directory with the following files under your target directory:

```text
[inFolderName]/
├── controller.js   # Handles the route request and invokes the DAL
├── dal.js          # Direct database interaction queries
├── route.js        # Defines validation middleware and endpoint routing
└── validation.js   # Validation schemas
```

Additionally, it dynamically parses and updates your local `end-points.js` file to import the new controller and bind it to the Express router.

---

## CI/CD Pipeline

This project is set up with GitHub Actions to:
- Automatically check version differences between local `package.json` and the NPM registry.
- Publish updates automatically to NPM whenever the local version is bumped higher than the published version.

---

## Development & Contribution

For detailed developer instructions, architecture layout, and test guides, please read our **[Developer Guide (dev.md)](dev.md)**.

## License

[MIT](LICENSE)
