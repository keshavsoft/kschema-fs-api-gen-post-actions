import path from "path";
import fixEndpointsJs from "express-fix-endpoints-post-js";
import { showLog } from "./showLog.js";

export const updateEndPointsJs = async ({
    toPath,
    cmd,
    inFolderName,
    showLog: isShowLog
}) => {
    const endPointsJsPath = path.join(toPath, "end-points.js");

    showLog({
        cmd,
        enabled: isShowLog,
        message: "Updating end-points.js for body parsing.",
        data: { endPointsJsPath, cmd, inFolderName }
    });

    const inGetType = (cmd === "groupBy") ? "withMiddleware" : "bodyParse";

    const response = await fixEndpointsJs({
        endPointsJsPath,
        showLog: isShowLog,
        inActionName: cmd,
        inFolderName,
        inGetType
    });

    showLog({
        enabled: isShowLog,
        message: "end-points.js update completed.",
        data: response
    });

    return response;
};
