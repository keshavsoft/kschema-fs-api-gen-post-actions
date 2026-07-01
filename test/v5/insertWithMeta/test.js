import path from "path";
import { insertWithMeta } from "../../../index.js";

insertWithMeta({
    toPath: process.cwd(),
    inTargetPath: process.cwd(),
    showLog: false,
    inGenerateRest: true,
    inFolderName: "fold1",
    inPort: "3015"
});