import path from "path";
import generateRest from "kschema-fs-api-gen-rest";
import { showLog } from "./showLog.js";

export const generateRestIfRequested = ({
    inGenerateRest,
    toConfigPath,
    inTargetPath,
    toPath,
    resolvedFolderName,
    isShowLog, inPort
}) => {
    if (!inGenerateRest) {
        showLog({
            enabled: isShowLog,
            message: "REST generation not requested."
        });

        return;
    };

    const restTargetPath = path.join(toPath, resolvedFolderName);

    showLog({
        enabled: isShowLog,
        message: "Generating REST files.",
        data: { toConfigPath, inTargetPath, toPath: restTargetPath }
    });

    const response = generateRest({
        toConfigPath,
        inTargetPath,
        toPath: restTargetPath,
        inPort
    });

    showLog({
        enabled: isShowLog,
        message: "REST generation completed.",
        data: response
    });

    return response;
};
