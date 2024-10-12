#! /usr/bin/node

const path = require('path');
const fs = require('fs');
const https = require('https');
const child_process = require('child_process');

const name = "AyaPingPing (TypeScript)";
const version = "v4.6.1";
const language = "TypeScript";
const generatorUrl = "https://raw.githubusercontent.com/dalikewara/ayapingping-sh/master/main_v4.sh";
const generatorFile = "main.sh";
const generatorFileTmp = "main_tmp.sh";
const baseStructureDir = "_base_structure";
const pathSeparator = path.sep;

async function main() {
    let command = "";
    let value = "";
    let sourcePrefix = "";
    let source = "";

    const argsLen = process.argv.length;

    if (argsLen >= 3) {
        command = process.argv[2];
    }
    if (argsLen >= 4) {
        value = process.argv[3];
    }
    if (argsLen >= 5) {
        sourcePrefix = process.argv[4];
    }
    if (argsLen >= 6) {
        source = process.argv[5];
    }

    try {
        const runtimeDir = await getRuntimeDir();
        await checkGenerator(runtimeDir);

        const cmd = child_process.spawn(runtimeDir + pathSeparator + generatorFile, [version, language, command, value, sourcePrefix, source], { stdio: 'inherit' });

        cmd.on('exit', (code) => {
            process.exit(code || 0);
        });
        cmd.on('error', (error) => {
            process.exit(1);
        })
    } catch (err) {
        process.exit(1);
    }
}

async function getRuntimeDir() {
    return path.dirname(__filename);
}

async function syncGenerator(runtimeDir) {
    try {
        const response = await new Promise((resolve, reject) => {
            https.get(generatorUrl, resolve).on('error', reject);
        });

        const file = fs.createWriteStream(runtimeDir + pathSeparator + generatorFileTmp);
        response.pipe(file);

        await new Promise((resolve, reject) => {
            file.on('finish', resolve);
            file.on('error', reject);
        });

        if (!isFileValidSH(runtimeDir + pathSeparator + generatorFileTmp)) {
            return;
        }

        const fileData = fs.readFileSync(runtimeDir + pathSeparator + generatorFileTmp);
        fs.writeFileSync(runtimeDir + pathSeparator + generatorFile, fileData, { mode: 0o775 });
    } catch (err) {}
}

async function checkGenerator(runtimeDir) {
    chmod(runtimeDir);
    await syncGenerator(runtimeDir);

    if (!isFile(runtimeDir + pathSeparator + generatorFile)) {
        console.log("no generator found, please connect to the internet and run the command again to synchronize");
        return;
    }

    if (!isFileValidSH(runtimeDir + pathSeparator + generatorFile)) {
        console.log("invalid generator file, please connect to the internet and run the command again to synchronize");
    }
}

function chmod(runtimeDir) {
    try {
        fs.chmodSync(runtimeDir + pathSeparator + generatorFile, 0o775);
        fs.chmodSync(runtimeDir + pathSeparator + generatorFileTmp, 0o775);

        fs.readdirSync(runtimeDir + pathSeparator + baseStructureDir).forEach((file) => {
            if (isDir(path.join(runtimeDir, baseStructureDir, file))) {
                fs.chmodSync(path.join(runtimeDir, baseStructureDir, file), 0o775);
                return
            }
            fs.chmodSync(path.join(runtimeDir, baseStructureDir, file), 0o664);
        });
    } catch (err) {}
}

function isFile(path) {
    try {
        const stats = fs.statSync(path);
        return stats.isFile();
    } catch (err) {
        return false;
    }
}

function isDir(path) {
    try {
        const stats = fs.statSync(path);
        return stats.isDirectory();
    } catch (err) {
        return false;
    }
}

function isFileValidSH(path) {
    try {
        const content = fs.readFileSync(path, 'utf-8');
        return content.startsWith("#!/bin/sh");
    } catch (err) {
        return false;
    }
}

main();
