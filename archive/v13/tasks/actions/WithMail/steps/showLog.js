export const showLog = ({ enabled, message, data }) => {
    if (!enabled) return;

    console.log(`[withMail] ${message}`);

    if (data === undefined) return;

    console.log(data);
};
