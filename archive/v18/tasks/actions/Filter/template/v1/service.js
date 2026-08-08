import readUsingLowdb from "./readUsingLowdb.js";

const startFunc = async ({ inRequestBody, inTablePath, inConfigPath }) => {
    const insertedPk = await readUsingLowdb({ inRequestBody, inTablePath, inConfigPath });

    return insertedPk;
};

export { startFunc };
