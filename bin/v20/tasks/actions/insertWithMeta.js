import { startFuncCommon } from "../common/startFuncCommon.js";

const startFunc = async (args) => {
    const knowledgeKey = "tablePostShowAll";

    return startFuncCommon({
        knowledgeKey,
        cmd: "insertWithMeta",
        inFolderName: "insertWithMeta",
        ...args
    });
};

export default startFunc;
