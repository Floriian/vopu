"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const get_service_1 = require("../services/get.service");
const getRouter = (0, express_1.Router)();
getRouter.get("/", get_service_1.listFiles);
getRouter.get("/:filename", get_service_1.getByFileName);
getRouter.get("/d/:filename", get_service_1.downloadByFilename);
exports.default = getRouter;
