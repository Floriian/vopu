import { Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import fs from "fs/promises";
import { filePath } from "../config";

export async function uploadFile(req: Request, res: Response) {
  if (req.files) return res.status(500).json({ message: "No files!" });
  const { filename } = req.files!;

  // @ts-ignore
  filename!.mv(`${filePath}/${filename}`, (err) => {
    if (err) return res.status(500).json({ message: "An error happened!" });
    res.status(200).json({ message: "File successfully uploaded!" });
  });
}

export async function uploadByBody(
  req: Request<{ name: string }, {}, { content: string }>,
  res: Response
) {
  const { content } = req.body;
  const { name } = req.params;
  try {
    const file = await fs.writeFile(`${filePath}/${name}.py`, content);
    return res.status(202).json({ message: "Successfully created file" });
  } catch (error) {
    return res.status(500).json({ error });
  }
}
