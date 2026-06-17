import path from "path";
import { insertGenPk } from "../../../index.js";

insertGenPk({
    toPath: process.cwd(),
    toConfigPath: path.join(process.cwd(), "Config", "Schemas", "journals.json"),
    showLog: true
});