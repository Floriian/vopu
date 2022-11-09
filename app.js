const fs = require("fs/promises");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const multer = require("multer");

const filePath = __dirname + "/files";

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, filePath);
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
// });
// const upload = multer({ storage: storage });

const app = express();
app.use(cors());
app.use(fileUpload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  console.log(filePath);
  const files = await fs.readdir(filePath);
  if (files.length <= 0) return res.status(404).json({ message: "No files!" });
  return res.status(200).json({ files });
});

app.get("/:filename", async (req, res) => {
  const { filename } = req.params;
  const file = await fs.readFile(`${filePath}/${filename}.txt`, {
    encoding: "utf-8",
  });
  return res.status(200).send(file);
});

app.get("/d/:filename", async (req, res) => {
  const { filename } = req.params;
  const file = await fs.readFile(`${filePath}/${filename}.txt`, {
    encoding: "utf-8",
  });
  if (file.length <= 0) return res.status(404).json({ message: "No file!" });
  return res.download(`${filePath}/${filename}.txt`);
});

app.post("/upload", function (req, res) {
  if (!req.files) return res.status(500).json({ message: "No files!" });
  const { filename } = req.files;
  const uploadTo = `files/${filename.name}`;
  filename.mv(uploadTo, (err) => {
    if (err) return res.status(500).json({ message: "An error happened" });
    res.status(200).json({ message: "File successfully uploaded!" });
  });
});

app.post("/u/:name", async (req, res) => {
  const { content } = req.body;
  const { name } = req.params;
  const file = fs.writeFile(`${filePath}/${name}.py`, content);
  if (file)
    return res.status(202).json({ message: "Successfully created file" });
  if (!file) return res.status(500).json({ message: "An error happened." });
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`App is listening at port ${process.env.PORT}`);
});
