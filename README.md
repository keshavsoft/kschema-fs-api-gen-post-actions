# kschema-fs-api-gen-post-actions

A configuration-driven scaffolding tool to instantly generate Express.js POST API actions.

This package automatically generates boilerplate code (controllers, data access layers, routes, and validation schemas) and registers the newly created routes directly into your `end-points.js` file.

---

## Installation

You can install the package globally or run it on-demand using `npx`.

### Global Installation

```bash
npm install -g kschema-fs-api-gen-post-actions
```

### Run with NPX

```bash
npx kschema-fs-api-gen-post-actions <command>
```

---

## Basic Usage

The CLI operates on your current working directory. Make sure you have an `end-points.js` file in the folder where you run the tool.

```bash
npx kschema-fs-api-gen-post-actions <Command>
```

### Available Commands

*   **`WithMail`**: Generates a POST action with email sending logic.
*   **`InsertGenPk`**: Generates an insert action with an automatically generated primary key.
*   **`InsertAsIs`**: Generates a standard insert action without primary key changes.
*   **`Filter`**: Generates a filter/query action.
*   **`groupBy`**: Generates a database grouping/aggregation action.

For example:
```bash
npx kschema-fs-api-gen-post-actions InsertAsIs
```

---

## Programmatic API

You can also use this tool programmatically inside your Node.js scripts:

```javascript
import { insertAsIs } from 'kschema-fs-api-gen-post-actions';

await insertAsIs({
  toPath: './my-api',
  inFolderName: 'InsertAsIs',
  inGenerateRest: false
});
```

---

## CI/CD Pipeline

This project is set up with GitHub Actions to:
- Automatically check version differences between local `package.json` and the NPM registry.
- Publish updates automatically to NPM whenever the local version is bumped higher than the published version.

---

## Development & Contribution

For detailed developer instructions, architecture layout, test guides, and how to add new generator actions, please read our **[Developer Guide (dev.md)](dev.md)**.

## License

[MIT](LICENSE)
