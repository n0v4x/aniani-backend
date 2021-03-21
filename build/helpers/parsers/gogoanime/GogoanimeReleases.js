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
class GogoanimeReleases extends Parser_1.Parser {
    _formatType(type) {
        return string_1.normalizeString(type).toLowerCase();
    }
    _formatEpisode(episode) {
        return string_1.normalizeString(episode.replace(/^\s*ep\s*/i, "")).toLowerCase();
    }
    _formatName(name) {
        return string_1.normalizeString(name);
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
    _parseReleases(html) {
        const $ = cheerio_1.default.load(html);
        const result = [];
        $("li").each((_, releaseContainer) => {
            const release = this._parseRelease($, releaseContainer);
            result.push(release);
        });
        return result;
    }
    parse(url) {
        return __awaiter(this, void 0, void 0, function* () {
            const { html } = yield this._fetchData(url);
            if (!html) {
                throw new Error("Releases: Html not found");
            }
            const releases = this._parseReleases(html);
            const result = {
                releases,
            };
            return result;
        });
    }
}
exports.default = GogoanimeReleases;
//# sourceMappingURL=GogoanimeReleases.js.map