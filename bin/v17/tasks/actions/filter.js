import { locateSource } from "./Filter/steps/locateSource.js";
import { locateDestination } from "./Filter/steps/locateDestination.js";
import { announce } from "./Filter/steps/announce.js";
import resolveFolderName from "./Filter/steps/resolveFolderName.js";
import { createActionFolder } from "./Filter/steps/createActionFolder.js";
import { updateEndPointsJs } from "./Filter/steps/updateEndPointsJs.js";
import { generateRestIfRequested } from "./Filter/steps/generateRestIfRequested.js";
import { showLog as writeLog } from "./Filter/steps/showLog.js";

const startFunc = async ({ toPath, isAnnounce = true, checkBeforeCreate = true,
    toConfigPath, inTargetPath, inFolderName, inGenerateRest = false, showLog = false,
    inPort
}) => {
    const cmd = "filter";

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
            toConfigPath,
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
