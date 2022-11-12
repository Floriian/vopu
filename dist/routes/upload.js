"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const upload_service_1 = require("../services/upload.service");
const uploadRouter = (0, express_1.Router)();
uploadRouter.post("/u", upload_service_1.uploadFile);
uploadRouter.post("/u/:name", upload_service_1.uploadByBody);
exports.default = uploadRouter;
