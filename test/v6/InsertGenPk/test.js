import path from "path";
import { insertGenPk } from "../../../index.js";

insertGenPk({
    toPath: process.cwd(),
    inTargetPath: process.cwd(),
    showLog: false,
    inGenerateRest: true,
    inFolderName: "fold1",
    inPort: "3015"
});