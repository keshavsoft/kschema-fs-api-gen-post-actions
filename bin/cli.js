#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import * as api from "../index.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, "../package.json"), "utf8"));

const showUsage = () => {
  const g = "\x1b[32m";
  const y = "\x1b[33m";
  const c = "\x1b[36m";
  const gray = "\x1b[90m";
  const r = "\x1b[0m";

  const commands = Object.keys(api);
  const commandsText = commands.map((name) => {
    return `  ${g}${name}${r}     Generate ${name} post action`;
  }).join("\n");

  const examplesText = commands.map((name) => {
    return `  ${gray}npx kschema-fs-api-gen-post-actions ${name}${r}`;
  }).join("\n");

  console.log(`
${c}🚀 KSchema Api Generator v${pkg.version}${r}

${y}Usage:${r}
  ${g}npx kschema-fs-api-gen-post-actions${r} <command> [folderName] [showLog]

${y}Commands:${r}
${commandsText}

${y}Examples:${r}
${examplesText}

${y}Tip:${r}
  ${gray}npm i -g kschema-fs-api-gen-post-actions${r}
`);
};

const run = async () => {
  const [cmd, folderName, showLogArg] = process.argv.slice(2);

  if (!cmd || cmd === "--help" || cmd === "-h" || cmd === "help") {
    showUsage();
    return;
  }

  const commandKey = Object.keys(api).find(key => key.toLowerCase() === cmd.toLowerCase());
  
  if (!commandKey || typeof api[commandKey] !== "function") {
    console.log(`Unknown command: ${cmd}\n`);
    showUsage();
    return;
  }

  const showLog = showLogArg === "true";

  try {
    await api[commandKey]({
      toPath: process.cwd(),
      inFolderName: folderName,
      inGenerateRest: true,
      showLog
    });
  } catch (error) {
    console.error(`Error executing command ${commandKey}:`, error);
    process.exit(1);
  }
};

run();