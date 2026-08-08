import { createFolder } from "../../../../core/createFolder.js";
import { showLog } from "./showLog.js";

export const createActionFolder = ({
    source,
    destination,
    isAnnounce,
    checkBeforeCreate,
    showLog: isShowLog
}) => {
    showLog({
        enabled: isShowLog,
        message: "Copying WithMail template.",
        data: { source, destination }
    });

    const response = createFolder({
        source,
        destination,
        isAnnounce,
        checkBeforeCreate
    });

    showLog({
        enabled: isShowLog,
        message: response.KTF ? "Template copy completed." : "Template copy skipped.",
        data: response
    });

    return response;
};
