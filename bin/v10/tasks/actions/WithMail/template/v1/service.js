import insertGenPk from "./insertGenPk.js";
import sendMail from "./Mail/sendMailCC.js";

const startFunc = async ({ inRequestBody, inTablePath, inConfigPath }) => {
    const insertedPk = await insertGenPk({ inRequestBody, inTablePath, inConfigPath });

    const info = await sendMail();

    return await {
        insertedPk,
        isMailSent: info.accepted.length > 0 &&
            info.rejected.length === 0
    };
};

export { startFunc };
