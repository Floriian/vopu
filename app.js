const fs = require("fs/promises");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  const files = await fs.readdir("files");
  if (files.length <= 0) return res.status(404).json({ message: "No files!" });
  return res.status(200).json({ files });
});

app.get("/:filename", async (req, res) => {
  const { filename } = req.params;
  const file = await fs.readFile(`files/${filename}.txt`, {
    encoding: "utf-8",
  });
  return res.status(200).send(file);
});

app.get("/d/:filename", async (req, res) => {
  const { filename } = req.params;
  const file = await fs.readFile(`files/${filename}.txt`, {
    encoding: "utf-8",
  });
  if (file.length <= 0) return res.status(404).json({ message: "No file!" });
  return res.download(`files/${filename}.txt`);
});

app.post("/u/", async (req, res) => {});

app.listen(3000, () => {
  console.log(`App is listening at port ${3000}`);
});
