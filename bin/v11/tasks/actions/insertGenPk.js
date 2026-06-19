import { locateSource } from "./InsertGenPk/steps/locateSource.js";
import { locateDestination } from "./InsertGenPk/steps/locateDestination.js";
import { announce } from "./InsertGenPk/steps/announce.js";
import resolveFolderName from "./InsertGenPk/steps/resolveFolderName.js";
import { createActionFolder } from "./InsertGenPk/steps/createActionFolder.js";
import { updateEndPointsJs } from "./InsertGenPk/steps/updateEndPointsJs.js";
import { generateRestIfRequested } from "./InsertGenPk/steps/generateRestIfRequested.js";
import { showLog as writeLog } from "./InsertGenPk/steps/showLog.js";

const startFunc = async ({ cmd = "", toPath, isAnnounce = true, checkBeforeCreate = true,
    toConfigPath, inTargetPath, inFolderName, inGenerateRest = false, showLog = false
}) => {
    writeLog({
        enabled: showLog,
        message: "Starting WithMail action.",
        data: { cmd, toPath, inFolderName, inGenerateRest }
    });

    const resolvedFolderName = resolveFolderName({
        name: cmd
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
            isShowLog: showLog
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
