import { startFuncCommon } from "../common/startFuncCommon.js";

const startFunc = async (args) => {
    return startFuncCommon({
        cmd: "insertGenPk",
        inDefaultFolderName: "InsertGenPk",
        ...args
    });
};

export default startFunc;
