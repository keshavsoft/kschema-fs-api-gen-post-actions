import path from "path";

import generateRest from "kschema-fs-api-gen-rest";
import fixEndpointsJs from "express-fix-endpoints-js";

import { locateSource } from "./InsertGenPk/steps/locateSource.js";
import { locateDestination } from "./InsertGenPk/steps/locateDestination.js";
import { createFolder } from "../../core/createFolder.js";

import { announce } from "./InsertGenPk/steps/announce.js";

import resolveFolderName from "./InsertGenPk/steps/resolveFolderName.js";
import actions from "./InsertGenPk/actions.json" with { type: "json" };

const startFunc = async ({ cmd = "", toPath, isAnnounce = true, checkBeforeCreate = true,
    toConfigPath, inTargetPath
}) => {

    const matched = actions;

    const localToPath = toPath;

    const resolvedFolderName = resolveFolderName({
        name: cmd
    });

    if (resolvedFolderName.KTF === false) {
        console.log(resolvedFolderName.KReason);

        return;
    };

    const source = locateSource();
    const destination = locateDestination({
        inResolvedFolderName: resolvedFolderName,
        toPath: localToPath
    });

    const createFolderResponse = createFolder({
        source, destination,
        isAnnounce, checkBeforeCreate
    });

    if (createFolderResponse.KTF) {
        const fromEndPointsJs = await fixEndpointsJs({
            endPointsJsPath: path.join(localToPath, "end-points.js"),
            inActionName: cmd
        });

        generateRest({
            toConfigPath, inTargetPath,
            toPath: path.join(localToPath, resolvedFolderName),
        });
    };

    if (isAnnounce) announce({ inResolvedFolderName: resolvedFolderName });

    return resolvedFolderName;
};

export default startFunc;