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
exports.StreamtapePlayer = void 0;
const cheerio_1 = __importDefault(require("cheerio"));
const axios_1 = __importDefault(require("axios"));
const Parser_1 = require("./Parser");
class StreamtapePlayer extends Parser_1.Parser {
    _normalizeVideoLink(videoLink) {
        const result = `https:${videoLink}`;
        return result;
    }
    _parseVideoLink(html) {
        const $ = cheerio_1.default.load(html);
        const videoLink = $("#videolink").text();
        const result = this._normalizeVideoLink(videoLink);
        return result;
    }
    _fetchVideoSrc(videoLink) {
        return __awaiter(this, void 0, void 0, function* () {
            const page = yield axios_1.default.get(videoLink, {
                maxRedirects: 0,
                validateStatus: (status) => status === 302,
            });
            const result = page.headers.location;
            return result;
        });
    }
    parse(url) {
        return __awaiter(this, void 0, void 0, function* () {
            const html = yield this._fetchHtml(url);
            const videoLink = this._parseVideoLink(html);
            const videoSrc = yield this._fetchVideoSrc(videoLink);
            const result = {
                src: videoSrc,
            };
            return result;
        });
    }
}
exports.StreamtapePlayer = StreamtapePlayer;
//# sourceMappingURL=StreamtapePlayer.js.map