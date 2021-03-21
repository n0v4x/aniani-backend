"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const string_1 = require("../../common/string");
const Parser_1 = require("../Parser");
class SeriesInfoParser extends Parser_1.Parser {
    _parseGenres($, genresContainer) {
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
    _formatDate(date) {
        return new Date(date).toJSON();
    }
    _parseDate(dateContainer) {
        const result = {
            start: null,
            end: null,
        };
        if (dateContainer.length !== 0) {
            const rawDates = (dateContainer[0].next.data || "").split("to");
            result.start = this._formatDate(rawDates[0]);
            result.end = this._formatDate(rawDates[1]);
        }
        return result;
    }
    _parseStatus(statusContainer) {
        let result = "";
        if (statusContainer.length !== 0 && statusContainer[0].next.data !== undefined) {
            result = string_1.normalizeString(statusContainer[0].next.data);
        }
        return result;
    }
    _parseSeriesInfo($) {
        const img = $(".thumnail_tool img").attr("src") || "";
        const name = string_1.normalizeString($(".bigChar").text());
        const dataContainers = $(".type");
        const dateContainer = dataContainers.find("span:contains('Date aired')");
        const genresContainer = dataContainers.has("span:contains('Genre')");
        const statusContainer = dataContainers.find("span:contains('Status')");
        const date = this._parseDate(dateContainer);
        const genres = this._parseGenres($, genresContainer);
        const status = this._parseStatus(statusContainer);
        const result = {
            img,
            name,
            genres,
            date,
            status,
        };
        return result;
    }
    parse(html) {
        const $ = this._loadHtml(html);
        const result = this._parseSeriesInfo($);
        return result;
    }
}
exports.default = SeriesInfoParser;
//# sourceMappingURL=SeriesInfoParser.js.map