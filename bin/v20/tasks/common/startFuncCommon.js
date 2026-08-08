import path from "path";
import { getFromEndPointsJsFile } from "./getFromEndPointsJsFile.js";
import { locateSource } from "./locateSource.js";
import { locateDestination } from "./locateDestination.js";
import { announce } from "./announce.js";
import { createActionFolder } from "./createActionFolder.js";
import { updateEndPointsJs } from "./updateEndPointsJs.js";
import { generateRestIfRequested } from "./generateRestIfRequested.js";
import { showLog as writeLog } from "./showLog.js";

export const startFuncCommon = async ({
    knowledgeKey,
    cmd,
    toPath,
    isAnnounce = true,
    checkBeforeCreate = true,
    inTargetPath,
    inFolderName,
    inGenerateRest = false,
    showLog = false,
    inPort
}) => {
    const localFolderName = inFolderName;

    const configPath = getFromEndPointsJsFile({ toPath });
    const configFullPath = path.join(inTargetPath, "/", configPath);

    const source = locateSource({ inActionFolderName: cmd });

    const destination = locateDestination({
        inResolvedFolderName: inFolderName,
        toPath
    });

    const createFolderResponse = createActionFolder({
        source, destination,
        isAnnounce, checkBeforeCreate, showLog
    });

    if (createFolderResponse.KTF) {
        await updateEndPointsJs({
            toPath,
            cmd: knowledgeKey,
            inFolderName,
            showLog
        });

        generateRestIfRequested({
            inGenerateRest,
            toConfigPath: configFullPath,
            inTargetPath,
            toPath,
            resolvedFolderName: localFolderName,
            isShowLog: showLog,
            inPort
        });
    };

    return localFolderName;
};
