import fs from "fs";
import express from "express";
import axios from "axios";

const app = express()
const port = 3000

async function getSaved() {
  console.log('-----');
  if (!fs.existsSync("save.json")) {

    console.log('request file');
    const response = await axios.get("https://api.github.com/users/kissmannchristoph/repos");

    if (response.status !== 200) {
      // fehler
      return;
    }

    await fs.writeFileSync("save.json", JSON.stringify(response.data));
  }
  const content = await fs.readFileSync("save.json");
  console.log('use file');
  return content;
}

app.get('/', async (req, res) => {
  res.send(await getSaved())
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})