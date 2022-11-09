const fs = require("fs/promises");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

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

app.post("/uf", async (req, res) => {
  //TODO: upload file with POST file
  const { files } = req;
  console.log(req.files);
  if (!files || Object.keys(files).length === 0) {
    return res.status(500).json({ message: "No file agreed!" });
  }

  const file = files.vopu;
  file.mv(`files/${file.name}`, (err) => {
    if (err) return res.status(500).send(err);
    return res.status(200).json({ message: "successfully uploaded file" });
  });
});

app.post("/u/:name", async (req, res) => {
  const { content } = req.body;
  const { name } = req.params;
  const file = fs.writeFile(`files/${name}.py`, content);
  if (file)
    return res.status(202).json({ message: "Successfully created file" });
  if (!file) return res.status(500).json({ message: "An error happened." });
});

app.listen(3000, () => {
  console.log(`App is listening at port ${3000}`);
});
