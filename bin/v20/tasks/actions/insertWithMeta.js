import { startFuncCommon } from "../common/startFuncCommon.js";

const startFunc = async (args) => {
    return startFuncCommon({
        cmd: "insertWithMeta",
        inFolderName: "insertWithMeta",
        ...args
    });
};

export default startFunc;
