import path from "path";
import { fileURLToPath } from "url";

import { insertWithMeta } from "../../../index.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

insertWithMeta({
    toPath: __dirname,
    inTargetPath: __dirname,
    inGenerateRest: true,
    inFolderName: "fold1",
    inPort: "3015"
});