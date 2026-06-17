import path from "path";
// import endPointsJs from "@keshavsoft/kschema-api-check";

// import fixEndpointsJs from "express-fix-endpoints-js";
import fixEndpointsJs from "express-fix-any-js";

import { locateSource } from "./PostMethods/WithMail/steps/locateSource.js";
import { locateDestination } from "./PostMethods/WithMail/steps/locateDestination.js";
import { createFolder } from "../../core/createFolder.js";

import updateEndPointsJs from "./PostMethods/WithMail/steps/updateEndPointsJs.js";
import createHttpFile from "./PostMethods/WithMail/steps/createHttpFile.js";

import { announce } from "./PostMethods/WithMail/steps/announce.js";

import resolveFolderName from "./PostMethods/WithMail/steps/resolveFolderName.js";
import actions from "../../config/actions.json" with { type: "json" };

const startFunc = async ({ cmd = "", toPath, isAnnounce = true, checkBeforeCreate = true }) => {

    const matched = actions.find(x => x.cmd === cmd);

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
        // endPointsJs({
        //     toPath: localToPath,
        //     action: resolvedFolderName
        // });

        // const fromEndPointsJs = await fixEndpointsJs({
        //     endPointsJsPath: path.join(localToPath, "end-points.js"),
        //     inCheckLines: matched.endPointsJs
        // });

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