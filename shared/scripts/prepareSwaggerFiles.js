import fs from "fs";

const path = "../docs/swagger";

const files = fs.readdirSync(path);
fs.writeFileSync("../docs/list.json", JSON.stringify(files));
