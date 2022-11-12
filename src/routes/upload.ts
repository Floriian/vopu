import { Router } from "express";
import { uploadByBody, uploadFile } from "../services/upload.service";

const uploadRouter: Router = Router();

uploadRouter.post("/", uploadFile);
uploadRouter.post("/:name", uploadByBody);

export default uploadRouter;
