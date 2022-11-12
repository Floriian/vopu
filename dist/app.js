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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const get_1 = __importDefault(require("./routes/get"));
const fs_1 = __importDefault(require("fs"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const config_1 = require("./config");
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = (0, express_1.default)();
        if (!fs_1.default.existsSync(config_1.filePath))
            return fs_1.default.mkdirSync(config_1.filePath);
        app.use((0, cors_1.default)());
        app.use(body_parser_1.default.json());
        app.use(body_parser_1.default.urlencoded({ extended: true }));
        app.use((0, express_fileupload_1.default)());
        app.use("/", get_1.default);
        app.listen(process.env.PORT || 3000, () => {
            console.log(`App is listening at port ${process.env.port || 3000}`);
        });
    });
}
bootstrap();
