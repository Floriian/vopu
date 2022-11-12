import { Router } from "express";
import { uploadByBody, uploadFile } from "../services/upload.service";

const uploadRouter: Router = Router();

uploadRouter.post("/u", uploadFile);
uploadRouter.post("/u/:name", uploadByBody);

export default uploadRouter;
