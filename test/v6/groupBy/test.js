import path from "path";
import { groupBy } from "../../../index.js";

groupBy({
    toPath: process.cwd(),
    toConfigPath: path.join(process.cwd(), "Config", "Schemas", "journals.json"),
    showLog: false,
    inGenerateRest: true,
    inPort: "3015"
});