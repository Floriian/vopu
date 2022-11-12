import { Router } from "express";
import {
  downloadByFilename,
  getByFileName,
  listFiles,
} from "../services/get.service";

const getRouter: Router = Router();

getRouter.get("/", listFiles);
getRouter.get("/:filename", getByFileName);
getRouter.get("/d/:filename", downloadByFilename);
export default getRouter;
