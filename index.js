import getLatestVersion from "./bin/core/getLatestVersion.js";

const load = async (cmd) => {
    const module = await import(`./bin/${getLatestVersion()}/tasks/actions/${cmd}.js`);

    return module.default; // Returns a function
};

const withMail = async ({ toPath }) => {
    const commandToSend = "withMail";

    const commandFunction = await load(commandToSend);
    // console.log("  ...args :", args);
    await commandFunction({
        toPath,
        cmd: "WithMail"
    });
};

const insertGenPk = async ({ toPath, showLog, toConfigPath, inTargetPath, inGenerateRest }) => {
    const commandToSend = "insertGenPk";

    const commandFunction = await load(commandToSend);
    // console.log("  ...args :", args);
    await commandFunction({
        toPath, cmd: commandToSend, toConfigPath, inTargetPath,
        inFolderName: commandToSend, inGenerateRest
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