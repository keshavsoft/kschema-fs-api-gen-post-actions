import { kschema } from "@keshavsoft/kschema";
import sendMail from "./Mail/sendMailCC.js";

const startFunc = async ({ inRequestBody, inTableName }) => {
    const tableName = inTableName;

    const insertedPk = await kschema.table(tableName).mutate.insertGenPk(inRequestBody);

    const info = await sendMail();

    return await {
        insertedPk,
        isMailSent: info.accepted.length > 0 &&
            info.rejected.length === 0
    };
};

export { startFunc };
