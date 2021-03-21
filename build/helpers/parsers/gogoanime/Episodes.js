"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Episodes = void 0;
const cheerio_1 = __importDefault(require("cheerio"));
const string_1 = require("../../common/string");
class Episodes {
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
    parse(html) {
        const $ = cheerio_1.default.load(html);
        const result = [];
        $("li a[data-name]").each((_, episodeContainer) => {
            const episode = this._parseEpisode($, episodeContainer);
            result.push(episode);
        });
        return result;
    }
}
exports.Episodes = Episodes;
//# sourceMappingURL=Episodes.js.map