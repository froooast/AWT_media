const express = require("express");
const IPFS = require("ipfs");
const util = require("util");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(bodyParser.text());
const node = new IPFS();

const ipfsGet = util.promisify(node.files.get);

let manifest;

app.get("/segment/:hash/:file", async (req, res) => {
  console.log("Serving " + req.params.hash + "/" + req.params.file);
  try {
    const files = await ipfsGet(req.params.hash + "/" + req.params.file);
    const fileObject = files[0];
    res.status(200).send(fileObject.content);
  } catch (e) {
    console.error(e);
    res.status(500).send("Error: check console");
  }
});
app.put("/manifest", (req, res) => {
  console.log("updating manifest!");
  manifest = req.body;
  res.status(201).send("ok");
});

app.get("/manifest", (req, res) => {
  res.status(200).send(manifest);
});
node.on("ready", () => {
  app.listen(4545);
  console.log("server starting on port 4545!");
});
