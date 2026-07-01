import fs from "fs";
import path from "path";

const getFromEndPointsJsFile = ({ toPath }) => {
    const endPointsFilePath = path.join(toPath, "end-points.js");
    const endPointsContent = fs.readFileSync(endPointsFilePath, "utf8");
    const configPathLine = endPointsContent.split(/\r?\n/)[4];
    const configPath = configPathLine.match(/configPath\s*=\s*["']([^"']+)["']/)[1];

    return configPath;
};

export { getFromEndPointsJsFile };
