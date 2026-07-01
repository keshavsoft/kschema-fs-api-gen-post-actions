import fs from "fs";
import path from "path";

import { locateSource } from "./groupBy/steps/locateSource.js";
import { locateDestination } from "./groupBy/steps/locateDestination.js";
import { announce } from "./groupBy/steps/announce.js";
import resolveFolderName from "./groupBy/steps/resolveFolderName.js";
import { createActionFolder } from "./groupBy/steps/createActionFolder.js";
import { updateEndPointsJs } from "../common/updateEndPointsJs.js";
import { generateRestIfRequested } from "./groupBy/steps/generateRestIfRequested.js";
import { showLog as writeLog } from "./groupBy/steps/showLog.js";

const getFromEndPointsJsFile = ({ toPath }) => {
    const endPointsFilePath = path.join(toPath, "end-points.js");
    const endPointsContent = fs.readFileSync(endPointsFilePath, "utf8");
    const configPathLine = endPointsContent.split(/\r?\n/)[4];
    const configPath = configPathLine.match(/configPath\s*=\s*["']([^"']+)["']/)[1];

    return configPath;
};

const startFunc = async ({ toPath, isAnnounce = true, checkBeforeCreate = true,
    inTargetPath, inFolderName, inGenerateRest = false, showLog = false,
    inPort
}) => {
    const cmd = "groupBy";
    const configPath = getFromEndPointsJsFile({ toPath });
    const configFullPath = path.join(toPath, "/", configPath);

    writeLog({
        enabled: showLog,
        message: "Starting WithMail action.",
        data: { cmd: inFolderName, toPath, inFolderName, inGenerateRest }
    });

    const resolvedFolderName = resolveFolderName({
        name: inFolderName
    });

    if (resolvedFolderName.KTF === false) {
        writeLog({
            enabled: showLog,
            message: "Folder name validation failed.",
            data: resolvedFolderName
        });

        console.log(resolvedFolderName.KReason);

        return;
    };

    const source = locateSource();
    const destination = locateDestination({
        inResolvedFolderName: resolvedFolderName,
        toPath
    });

    writeLog({
        enabled: showLog,
        message: "Resolved source and destination.",
        data: { source, destination }
    });

    const createFolderResponse = createActionFolder({
        source, destination,
        isAnnounce, checkBeforeCreate, showLog
    });

    // if (false) {
    if (createFolderResponse.KTF) {
        await updateEndPointsJs({
            toPath,
            cmd,
            inFolderName,
            showLog
        });

        generateRestIfRequested({
            inGenerateRest,
            toConfigPath: configFullPath,
            inTargetPath,
            toPath,
            resolvedFolderName,
            isShowLog: showLog,
            inPort
        });
    };

    if (isAnnounce) announce({ inResolvedFolderName: resolvedFolderName });

    writeLog({
        enabled: showLog,
        message: "WithMail action completed.",
        data: { resolvedFolderName }
    });

    return resolvedFolderName;
};

export default startFunc;
