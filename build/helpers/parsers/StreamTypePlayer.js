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
exports.StreamTypePlayer = void 0;
const cheerio_1 = __importDefault(require("cheerio"));
const Parser_1 = require("./Parser");
class StreamTypePlayer extends Parser_1.Parser {
    _parseVideoSrc(html) {
        const $ = cheerio_1.default.load(html);
        const result = $("#videolink").text();
        return result;
    }
    parse(url) {
        return __awaiter(this, void 0, void 0, function* () {
            const html = yield this._fetchHtml(url);
            const videoSrc = this._parseVideoSrc(html);
            const result = {
                src: videoSrc,
            };
            return result;
        });
    }
}
exports.StreamTypePlayer = StreamTypePlayer;
//# sourceMappingURL=StreamTypePlayer.js.map