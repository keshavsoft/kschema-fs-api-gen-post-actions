import path from "path";
import { filter } from "../../../index.js";

filter({
    toPath: process.cwd(),
    toConfigPath: path.join(process.cwd(), "Config", "Schemas", "journals.json"),
    showLog: false,
    inGenerateRest: true,
    inPort: "3015"
});