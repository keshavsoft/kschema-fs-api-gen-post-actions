import { locateSource } from "./groupBy/steps/locateSource.js";
import { locateDestination } from "./groupBy/steps/locateDestination.js";
import { announce } from "./groupBy/steps/announce.js";
import resolveFolderName from "./groupBy/steps/resolveFolderName.js";
import { createActionFolder } from "./groupBy/steps/createActionFolder.js";
import { updateEndPointsJs } from "../common/updateEndPointsJs.js";
import { generateRestIfRequested } from "./groupBy/steps/generateRestIfRequested.js";
import { showLog as writeLog } from "./groupBy/steps/showLog.js";
import { startFuncCommon } from "../common/startFuncCommon.js";

const startFunc = async (args) => {
    return startFuncCommon({
        cmd: "groupBy",
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
