import { locateSource } from "./InsertGenPk/steps/locateSource.js";
import { locateDestination } from "./InsertGenPk/steps/locateDestination.js";
import { announce } from "./InsertGenPk/steps/announce.js";
import resolveFolderName from "./InsertGenPk/steps/resolveFolderName.js";
import { createActionFolder } from "./InsertGenPk/steps/createActionFolder.js";
import { updateEndPointsJs } from "./InsertGenPk/steps/updateEndPointsJs.js";
import { generateRestIfRequested } from "./InsertGenPk/steps/generateRestIfRequested.js";
import { showLog as writeLog } from "./InsertGenPk/steps/showLog.js";
import { startFuncCommon } from "../common/startFuncCommon.js";

const startFunc = async (args) => {
    return startFuncCommon({
        cmd: "insertGenPk",
        ...args,
        locateSource,
        locateDestination,
        announce,
        resolveFolderName,
        createActionFolder,
        updateEndPointsJs,
        generateRestIfRequested,
        writeLog
    });
};

export default startFunc;
