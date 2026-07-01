import path from "path";
import { getFromEndPointsJsFile } from "./getFromEndPointsJsFile.js";
import { locateSource } from "./locateSource.js";
import { locateDestination } from "./locateDestination.js";
import { announce } from "./announce.js";
import resolveFolderName from "./resolveFolderName.js";
import { createActionFolder } from "./createActionFolder.js";
import { updateEndPointsJs } from "./updateEndPointsJs.js";
import { generateRestIfRequested } from "./generateRestIfRequested.js";
import { showLog as writeLog } from "./showLog.js";

export const startFuncCommon = async ({
    cmd,
    inDefaultFolderName,
    toPath,
    isAnnounce = true,
    checkBeforeCreate = true,
    inTargetPath,
    inFolderName,
    inGenerateRest = false,
    showLog = false,
    inPort
}) => {
    const configPath = getFromEndPointsJsFile({ toPath });
    const configFullPath = path.join(inTargetPath, "/", configPath);

    writeLog({
        cmd,
        enabled: showLog,
        message: "Starting action.",
        data: { cmd: inFolderName, toPath, inFolderName, inGenerateRest }
    });

    const resolvedFolderName = resolveFolderName({
        name: inFolderName,
        inDefaultFolderName
    });

    if (resolvedFolderName.KTF === false) {
        writeLog({
            cmd,
            enabled: showLog,
            message: "Folder name validation failed.",
            data: resolvedFolderName
        });

        console.log(resolvedFolderName.KReason);

        return;
    };

    const source = locateSource({ inActionFolderName: inDefaultFolderName });
    const destination = locateDestination({
        inResolvedFolderName: resolvedFolderName,
        toPath
    });

    writeLog({
        cmd,
        enabled: showLog,
        message: "Resolved source and destination.",
        data: { source, destination }
    });

    const createFolderResponse = createActionFolder({
        source, destination,
        isAnnounce, checkBeforeCreate, showLog
    });

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
        cmd,
        enabled: showLog,
        message: "Action completed.",
        data: { resolvedFolderName }
    });

    return resolvedFolderName;
};
