import path from "path";
import fixEndpointsJs from "express-fix-any-js";

import { locateSource } from "./WithMail/steps/locateSource.js";
import { locateDestination } from "./WithMail/steps/locateDestination.js";
import { createFolder } from "../../core/createFolder.js";

import updateEndPointsJs from "./WithMail/steps/updateEndPointsJs.js";
import createHttpFile from "./WithMail/steps/createHttpFile.js";

import { announce } from "./WithMail/steps/announce.js";

import resolveFolderName from "./WithMail/steps/resolveFolderName.js";
import actions from "./WithMail/actions.json" with { type: "json" };

const startFunc = async ({ cmd = "", toPath, isAnnounce = true, checkBeforeCreate = true }) => {

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
            jsFilePath: path.join(localToPath, "end-points.js"),
            inCheckLines: matched.endPointsJs
        });

        createHttpFile({
            inTargetPath: path.join(localToPath, resolvedFolderName),
            toPath: process.cwd()
        });
    };

    if (isAnnounce) announce({ inResolvedFolderName: resolvedFolderName });

    return resolvedFolderName;
};

export default startFunc;