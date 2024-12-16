import fs from "fs";
import { execSync } from "child_process";

const swaggerPath = "../docs/swagger";
const asyncApiPath = "../docs/asyncapi";

function getExecString(file) {
  return `asyncapi generate fromTemplate ${asyncApiPath}/${file} @asyncapi/html-template@2.3.14 --param version=2.2.0 singleFile=false --output ${asyncApiPath}/docs/${file} --force-write`;
}

const swaggerFiles = fs.readdirSync(swaggerPath);
const asyncApiFiles = fs
  .readdirSync(asyncApiPath)
  .filter((search) => search !== "docs");

for (const asyncApiFile of asyncApiFiles) {
  console.log("build asyncapi: " + asyncApiFile);
  try {
    const cmd = getExecString(asyncApiFiles[0]);
    const out = execSync(cmd).toString();

    // await fs.rename(`${asyncApiPath}/../docs/index.html`, `${asyncApiPath}/../docs/${file}`);
    console.log(out);
  } catch (error) {
    console.error("error build asyncapi: " + asyncApiFile);
    console.error(error.message);
    error.status; // 0 : successful exit, but here in exception it has to be greater than 0
    error.message; // Holds the message you typically want.
    error.stderr; // Holds the stderr output. Use `.toString()`.
    error.stdout; // Holds the stdout output. Use `.toString()`.
  }
}

fs.writeFileSync(
  "../docs/list.json",
  JSON.stringify({
    swaggerFiles,
    asyncApiFiles,
  }),
);
