export const showLog = ({ enabled, message, data, cmd }) => {
    if (!enabled) return;

    console.log(`[${cmd}] ${message}`);

    if (data === undefined) return;

    console.log(data);
};
