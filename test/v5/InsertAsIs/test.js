import path from "path";
import { insertAsIs } from "../../../index.js";

insertAsIs({
    toPath: process.cwd(),
    toConfigPath: path.join(process.cwd(), "Config", "Schemas", "journals.json"),
    showLog: true
});