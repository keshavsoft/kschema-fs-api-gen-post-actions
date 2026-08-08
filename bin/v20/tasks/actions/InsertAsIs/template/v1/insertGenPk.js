import insertBase from "./insertBase.js";
import getData from "./getData.js";
import getSchema from "./getSchema.js";
import { getPrimaryKey, attachPrimaryKey } from "./helpers/pkHelper.js";

const validateInput = ({ record }) => {
    if (!record || typeof record !== "object") throw new Error("record must be object");
};

const insertGenPk = async ({ inRequestBody, inTablePath, inConfigPath }) => {
    validateInput({ record: inRequestBody });

    const schema = await getSchema({ inConfigPath });
    const pk = getPrimaryKey(schema.columnsConfig);

    if (inRequestBody[pk] !== undefined) {
        return insertBase({ inRequestBody, inTablePath });
    };

    const data = await getData({ inTablePath });
    const newRecord = attachPrimaryKey(inRequestBody, pk, data);

    await insertBase({
        inRequestBody: newRecord,
        inTablePath
    });

    return newRecord[pk];
};

export default insertGenPk;