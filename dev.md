# Developer Guide – kschema-fs-api-gen-post-actions

This guide describes the architecture, codebase structure, execution flow, and development workflows for `kschema-fs-api-gen-post-actions`.

---

## Architecture Overview

The tool is built with a decoupled, configuration-driven layered architecture that supports dynamic version loading and plugin-style extensions.

```text
Terminal Input
      ↓
[Entry Layer] (bin/cli.js)
      ↓ Checks latest runtime directory (e.g., v14)
[Runtime Loader] (bin/core/loadRunner.js)
      ↓ Dynamic import
[Runtime Engine] (bin/v14/start.js)
      ↓ Checks command against actions.json
[Registry Lookup] (bin/v14/config/actions.json)
      ↓ Resolves command script
[Action Task] (bin/v14/tasks/actions/insertAsIs.js)
      ↓ Executes templates scaffolding & modifies endpoints
[Integration Layer] (express-fix-endpoints-post-js / kschema-fs-api-gen-rest)
```

---

## Directory Structure

```text
kschema-fs-api-gen-post-actions/
 ├── index.js                      # Programmatic API entrypoint
 ├── package.json                  # Dependencies and binaries mapping
 ├── bin/
 │    ├── cli.js                   # CLI global binary runner
 │    ├── core/
 │    │    ├── getLatestVersion.js # Resolves the highest vXX folder
 │    │    └── loadRunner.js       # Imports/bootstraps start.js of latest version
 │    │
 │    ├── v13/                     # Version 13 runtime (Legacy/Isolated)
 │    │    ├── config/actions.json # Version 13 command registry
 │    │    └── ...
 │    │
 │    └── v14/                     # Active version 14 runtime
 │         ├── config/
 │         │    └── actions.json   # Command registry (JSON-driven)
 │         ├── core/
 │         │    ├── parseInput.js
 │         │    ├── resolveCommand.js
 │         │    └── showUsage.js   # Usage & help screen formatter
 │         │
 │         └── tasks/
 │              ├── common/
 │              └── actions/
 │                   ├── filter.js
 │                   ├── Filter/   # Templates & steps for Filter action
 │                   ├── insertAsIs.js
 │                   ├── InsertAsIs/
 │                   └── ...
 └── test/                         # Harness for local testing
```

---

## Key Execution Layers

### 1. Dynamic Version Detection
The `bin/cli.js` entry point reads the `bin/` directory, filters folders matching `/^v\d+$/`, sorts them numerically, and loads the start file for the highest version. This guarantees backward compatibility while enabling zero-impact updates.

```javascript
// bin/core/getLatestVersion.js
const versions = fs.readdirSync(path.join(__dirname, ".."))
    .filter(n => /^v\d+$/.test(n))
    .sort((a, b) => parseInt(a.slice(1)) - parseInt(b.slice(1)));

return versions.at(-1); // returns e.g. "v14"
```

### 2. Command Registry (`actions.json`)
Command resolution is entirely decoupled. Commands are mapped to their respective scripts in the version's config file (e.g. `bin/v14/config/actions.json`):

```json
[
  {
    "cmd": "InsertAsIs",
    "file": "insertAsIs",
    "exportFile": "InsertAsIs",
    "description": "Generate InsertAsIs POST action"
  }
]
```

### 3. Modifying Targets (`express-fix-endpoints-post-js`)
Rather than rewriting route files via regex patterns, action modules use the `express-fix-endpoints-post-js` library to parse, format, and safely inject imports and route handlers into the consumer's `end-points.js` file.

---

## Adding a New Command

To add a new generator action (e.g., `Update` or `Delete`):

1. **Create the Action Task File**:
   Add `bin/v14/tasks/actions/delete.js` to execute the generation workflow.
2. **Create Steps & Templates**:
   Create a folder `bin/v14/tasks/actions/Delete/` containing:
   - `steps/locateSource.js`, `steps/locateDestination.js`
   - Scaffolding templates: `controller.js`, `dal.js`, `route.js`, `validation.js`
3. **Register the Action**:
   Add the metadata mapping to `bin/v14/config/actions.json`:
   ```json
   {
     "cmd": "Delete",
     "file": "delete",
     "exportFile": "Delete",
     "description": "Generate Delete POST action"
   }
   ```
4. **Expose in Programmatic API** (Optional):
   Export your action in `index.js` for developers consuming the package programmatically.

---

## Local Development & Testing

Use the `test/` directory to run actions locally without publishing to NPM.

```bash
# Execute local CLI wrapper
node ./bin/cli.js <Command>

# Run a dedicated test script
node test/insertAsIs.js
```

Each test script calls the module's programmatic exports in `index.js` against dummy endpoint files to confirm correct templating and integration.
