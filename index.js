import getLatestVersion from "./bin/core/getLatestVersion.js";

const load = async (cmd) => {
    const module = await import(`./bin/${getLatestVersion()}/tasks/actions/${cmd}.js`);

    return module.default; // Returns a function
};

const withMail = async ({ toPath, showLog, toConfigPath, inTargetPath, inGenerateRest }) => {
    const commandToSend = "withMail";

    const commandFunction = await load(commandToSend);
    // console.log("  ...args :", args);
    await commandFunction({
        toPath, cmd: commandToSend, toConfigPath, inTargetPath,
        inFolderName: commandToSend, inGenerateRest, showLog
    });
};

const insertGenPk = async ({ toPath, showLog, toConfigPath, inTargetPath,
    inGenerateRest, inPort }) => {

    const commandToSend = "insertGenPk";

    const commandFunction = await load(commandToSend);
    // console.log("  ...args :", args);
    await commandFunction({
        toPath, toConfigPath, inTargetPath,
        inFolderName: commandToSend, inGenerateRest,
        showLog, inPort
    });
};

const insertAsIs = async ({ toPath, showLog, toConfigPath, inTargetPath, inGenerateRest }) => {
    const commandToSend = "insertAsIs";

    const commandFunction = await load(commandToSend);
    // console.log("  ...args :", args);
    await commandFunction({
        toPath, cmd: commandToSend, toConfigPath, inTargetPath,
        inFolderName: commandToSend, inGenerateRest
    });
};

export {
    withMail, insertGenPk, insertAsIs
};
