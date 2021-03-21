"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const string_1 = require("../../common/string");
const Parser_1 = require("../Parser");
const slugify_1 = __importDefault(require("slugify"));
const utils_1 = require("../../utils");
class EpisodesParser extends Parser_1.Parser {
    _formatName(name) {
        return string_1.normalizeString(name);
    }
    _parseEpisode($, episodeContainer) {
        const id = $(episodeContainer).attr("data-name");
        const name = this._formatName($(episodeContainer).attr("data-name-normalized"));
        const altId = slugify_1.default(name);
        const serversIds = $(episodeContainer).attr("data-servers").split(",");
        const available = serversIds.includes(utils_1.PlayersIds.Default.toString());
        const result = {
            id,
            altId,
            name,
            available,
        };
        return result;
    }
    _parseEpisodes($) {
        const result = [];
        $("li a[data-name]").each((_, episodeContainer) => {
            const episode = this._parseEpisode($, episodeContainer);
            result.push(episode);
        });
        return result;
    }
    parse(html) {
        const $ = this._loadHtml(html);
        const result = this._parseEpisodes($);
        return result;
    }
}
exports.default = EpisodesParser;
//# sourceMappingURL=EpisodesParser.js.map