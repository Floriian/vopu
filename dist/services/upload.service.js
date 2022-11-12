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
exports.uploadByBody = exports.uploadFile = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const config_1 = require("../config");
function uploadFile(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        if (req.files)
            return res.status(500).json({ message: "No files!" });
        const { filename } = req.files;
        // @ts-ignore
        filename.mv(`${config_1.filePath}/${filename}`, (err) => {
            if (err)
                return res.status(500).json({ message: "An error happened!" });
            res.status(200).json({ message: "File successfully uploaded!" });
        });
    });
}
exports.uploadFile = uploadFile;
function uploadByBody(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { content } = req.body;
        const { name } = req.params;
        try {
            const file = yield promises_1.default.writeFile(`${config_1.filePath}/${name}.py`, content);
            return res.status(202).json({ message: "Successfully created file" });
        }
        catch (error) {
            return res.status(500).json({ error });
        }
    });
}
exports.uploadByBody = uploadByBody;
