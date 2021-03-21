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
const cheerio_1 = __importDefault(require("cheerio"));
const string_1 = require("../../common/string");
const Parser_1 = require("../Parser");
class GogoanimeEpisodes extends Parser_1.Parser {
    _formatName(name) {
        return string_1.normalizeString(name);
    }
    _parseEpisode($, episodeContainer) {
        const id = $(episodeContainer).attr("data-name");
        const name = this._formatName($(episodeContainer).attr("data-name-normalized"));
        const serversIds = $(episodeContainer).attr("data-servers").split(",");
        const available = serversIds.includes(process.env.MP4UPLOAD_SERVER_ID);
        const result = {
            id,
            name,
            available,
        };
        return result;
    }
    _parseEpisodes(html) {
        const $ = cheerio_1.default.load(html);
        const result = [];
        $("li a[data-name]").each((_, episodeContainer) => {
            const episode = this._parseEpisode($, episodeContainer);
            result.push(episode);
        });
        return result;
    }
    parse(url) {
        return __awaiter(this, void 0, void 0, function* () {
            const { html } = yield this._fetchData(url);
            if (!html) {
                throw new Error("Episodes: Html not found");
            }
            const episodes = this._parseEpisodes(html);
            const result = {
                episodes,
            };
            return result;
        });
    }
}
exports.default = GogoanimeEpisodes;
//# sourceMappingURL=GogoanimeEpisodes.js.map