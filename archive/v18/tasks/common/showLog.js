export const showLog = ({ enabled, message, data, cmd }) => {
    if (!enabled) return;

    const prefix = cmd ? `[${cmd}]` : "[withMail]";
    console.log(`${prefix} ${message}`);

    if (data === undefined) return;

    console.log(data);
};
