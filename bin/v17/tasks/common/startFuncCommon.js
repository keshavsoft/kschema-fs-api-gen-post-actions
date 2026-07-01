import path from "path";
import { getFromEndPointsJsFile } from "./getFromEndPointsJsFile.js";

export const startFuncCommon = async ({
    cmd,
    toPath,
    isAnnounce = true,
    checkBeforeCreate = true,
    inTargetPath,
    inFolderName,
    inGenerateRest = false,
    showLog = false,
    inPort,
    locateSource,
    locateDestination,
    announce,
    resolveFolderName,
    createActionFolder,
    updateEndPointsJs,
    generateRestIfRequested,
    writeLog
}) => {
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
