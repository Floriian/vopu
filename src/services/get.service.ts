import { Request, Response } from "express";
import fs from "fs/promises";
import { filePath } from "../config";

export async function listFiles(req: Request, res: Response) {
  const files = await fs.readdir(filePath);
  if (files.length <= 0) return res.status(404).json({ message: "No files! " });
  return res.status(200).json({ files });
}

export async function getByFileName(req: Request, res: Response) {
  const { filename } = req.params;
  try {
    const file = await fs.readFile(`${filePath}/${filename}.py`, {
      encoding: "utf-8",
    });
    if (file.length <= 0)
      return res.status(404).json({ message: "No file found with this name!" });
    return res.status(200).json({ file });
  } catch (error) {
    return res.status(400).json({ message: "We have a problem" });
  }
}

export async function downloadByFilename(req: Request, res: Response) {
  const { filename } = req.params;
  if (filename.length <= 0)
    return res
      .status(500)
      .json({ message: "I need a filename without extension!" });
  const file = await fs.readFile(`${filePath}/${filename}`);
  if (file.length <= 0) return res.status(404).json({ message: "No file" });
  return res.download(`${filePath}/${filename}.py`);
}
