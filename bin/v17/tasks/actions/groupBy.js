import { startFuncCommon } from "../common/startFuncCommon.js";

const startFunc = async (args) => {
    return startFuncCommon({
        cmd: "groupBy",
        inDefaultFolderName: "groupBy",
        ...args
    });
};

export default startFunc;
