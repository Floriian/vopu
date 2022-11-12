import express, { Express, Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import getRouter from "./routes/get";

import fs from "fs";
import fileUpload from "express-fileupload";
import { filePath } from "./config";

async function bootstrap() {
  const app: Express = express();

  if (!fs.existsSync(filePath)) return fs.mkdirSync(filePath);

  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(fileUpload());

  app.use("/", getRouter);

  app.listen(process.env.PORT || 3000, () => {
    console.log(`App is listening at port ${process.env.port || 3000}`);
  });
}
bootstrap();
