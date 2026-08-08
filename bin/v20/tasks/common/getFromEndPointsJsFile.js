import fs from "fs";
import path from "path";

const getFromEndPointsJsFile1 = ({ toPath }) => {
    const endPointsFilePath = path.join(toPath, "end-points.js");
    const endPointsContent = fs.readFileSync(endPointsFilePath, "utf8");
    const configPathLine = endPointsContent.split(/\r?\n/)[4];
    const configPath = configPathLine.match(/configPath\s*=\s*["']([^"']+)["']/)[1];

    return configPath;
};

const getFromEndPointsJsFile = ({ toPath }) => {
    const endPointsFilePath = path.join(toPath, "end-points.js");
    const endPointsContent = fs.readFileSync(endPointsFilePath, "utf8");

    const configPathLine1 = endPointsContent.split(/\r?\n/)[4];
    const configPathLine = endPointsContent
        .split(/\r?\n/)
        .find(line => line.includes("configPath"));

    if (!configPathLine) {
        return null;
    };

    const [, value] = configPathLine.split("=");
    const configPath = value.trim().replace(/["';]/g, "");

    // const match = configPathLine.match(/configPath\s*=\s*["']([^"']+)["']/);

    // if (!match) {
    //     return null;
    // }

    return configPath;
};

export { getFromEndPointsJsFile };
