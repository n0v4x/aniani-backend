"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Description = void 0;
const cheerio_1 = __importDefault(require("cheerio"));
const string_1 = require("../../common/string");
class Description {
    _parseGenres($, dataContainers) {
        const genresContainer = dataContainers.has("span:contains('Genre')");
        const result = [];
        if (genresContainer.length !== 0) {
            $(genresContainer)
                .find("a")
                .each((_, genreContainer) => {
                const genre = $(genreContainer).text();
                result.push(genre);
            });
        }
        return result;
    }
    _parseDate($, dataContainers) {
        const dateContainer = dataContainers.find("span:contains('Date aired')");
        const result = {
            start: "",
            end: "",
        };
        if (dateContainer.length !== 0) {
            const dateTokens = (dateContainer[0].next.data || "").split("to");
            result.start = dateTokens[0].trim();
            result.end = dateTokens[1].trim();
        }
        return result;
    }
    _parseStatus($, dataContainers) {
        const statusContainer = dataContainers.find("span:contains('Status')");
        if (statusContainer.length === 0)
            return "";
        const status = statusContainer[0].next.data || "";
        const result = string_1.normalizeString(status);
        return result;
    }
    parse(html) {
        const $ = cheerio_1.default.load(html);
        const img = $(".thumnail_tool img").attr("src") || "";
        const name = string_1.normalizeString($(".bigChar").text());
        const dataContainers = $(".type");
        const genres = this._parseGenres($, dataContainers);
        const date = this._parseDate($, dataContainers);
        const status = this._parseStatus($, dataContainers);
        const result = {
            img,
            name,
            genres,
            date,
            status,
        };
        return result;
    }
}
exports.Description = Description;
//# sourceMappingURL=Description.js.map