import { JSONFilePreset } from 'lowdb/node'

const validateInput = ({ record }) => {
    if (!record || typeof record !== "object") throw new Error("record must be object");
};

const readUsingLowdb = async ({ inRequestBody, inTablePath, inConfigPath }) => {
    validateInput({ record: inRequestBody });

    const db = await JSONFilePreset(inTablePath, []);

    await db.read();

    const filteredRows = db.data.filter(item => {
        return Object.entries(inRequestBody).every(
            ([key, value]) => item[key] === value
        )
    });

    return await filteredRows;
};

export default readUsingLowdb;
