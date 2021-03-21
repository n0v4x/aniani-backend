"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Releases = void 0;
const cheerio_1 = __importDefault(require("cheerio"));
const string_1 = require("../../common/string");
class Releases {
    _formatType(type) {
        return string_1.normalizeString(type).toLowerCase();
    }
    _formatEpisode(episode) {
        return string_1.normalizeString(episode.replace(/^\s*ep\s*/i, "")).toLowerCase();
    }
    _formatName(name) {
        return string_1.normalizeString(name).toLowerCase();
    }
    _parseId(url) {
        const tokens = url.split("-");
        const result = tokens[tokens.length - 1];
        return result;
    }
    _parseRelease($, releaseContainer) {
        const nameContaienr = $(releaseContainer).find(".name a");
        const id = this._parseId(nameContaienr.attr("href"));
        const name = this._formatName(nameContaienr.text());
        const img = $(releaseContainer).find(".img img").attr("src");
        const type = this._formatType($(releaseContainer).find(".type").text());
        const episode = this._formatEpisode($(releaseContainer).find(".episode").text());
        const result = {
            id,
            name,
            img,
            type,
            episode,
        };
        return result;
    }
    parse(html) {
        const $ = cheerio_1.default.load(html);
        const result = [];
        $("li").each((_, releaseContainer) => {
            const release = this._parseRelease($, releaseContainer);
            result.push(release);
        });
        return result;
    }
}
exports.Releases = Releases;
//# sourceMappingURL=Releases.js.map