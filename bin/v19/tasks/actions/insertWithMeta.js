import { startFuncCommon } from "../common/startFuncCommon.js";

const startFunc = async (args) => {
    return startFuncCommon({
        cmd: "insertWithMeta",
        inDefaultFolderName: "insertWithMeta",
        ...args
    });
};

export default startFunc;
