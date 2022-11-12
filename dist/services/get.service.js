"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadByFilename = exports.getByFileName = exports.listFiles = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const config_1 = require("../config");
function listFiles(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const files = yield promises_1.default.readdir(config_1.filePath);
        if (files.length <= 0)
            return res.status(404).json({ message: "No files! " });
        return res.status(200).json({ files });
    });
}
exports.listFiles = listFiles;
function getByFileName(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { filename } = req.params;
        try {
            const file = yield promises_1.default.readFile(`${config_1.filePath}/${filename}.py`, {
                encoding: "utf-8",
            });
            if (file.length <= 0)
                return res.status(404).json({ message: "No file found with this name!" });
            return res.status(200).json({ file });
        }
        catch (error) {
            return res.status(400).json({ message: "We have a problem" });
        }
    });
}
exports.getByFileName = getByFileName;
function downloadByFilename(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { filename } = req.params;
        if (filename.length <= 0)
            return res
                .status(500)
                .json({ message: "I need a filename without extension!" });
        const file = yield promises_1.default.readFile(`${config_1.filePath}/${filename}`);
        if (file.length <= 0)
            return res.status(404).json({ message: "No file" });
        return res.download(`${config_1.filePath}/${filename}.py`);
    });
}
exports.downloadByFilename = downloadByFilename;
