import fs from "fs";
import { execSync } from "child_process";

function getExecString(file) {
    return "asyncapi generate fromTemplate .\\" +file + " @asyncapi/html-template@2.3.14 --param version=3.0.0 singleFile=true --output ./docs --force-write"
} 
  
const swaggerPath = "../docs/swagger";
const asyncApiPath = "../docs/asyncapi";

const swaggerFiles = fs.readdirSync(swaggerPath);
const asyncApiFiles = fs.readdirSync(asyncApiPath).filter(search => search !== "docs");

try {
    const cmd = 'git rev-parse --is-inside-work-tree';
    execSync(cmd).toString();
 } catch (error) {
    error.status;  // 0 : successful exit, but here in exception it has to be greater than 0
    error.message; // Holds the message you typically want.
    error.stderr;  // Holds the stderr output. Use `.toString()`.
    error.stdout;  // Holds the stdout output. Use `.toString()`.
 }

fs.writeFileSync("../docs/list.json", JSON.stringify({
    swaggerFiles,
    asyncApiFiles
}));
