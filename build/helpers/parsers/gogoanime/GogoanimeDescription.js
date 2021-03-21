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
class GogoanimeDescription extends Parser_1.Parser {
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
    _formatDate(date) {
        return new Date(date).toJSON();
    }
    _parseDate($, dataContainers) {
        const dateContainer = dataContainers.find("span:contains('Date aired')");
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
    _parseStatus($, dataContainers) {
        const statusContainer = dataContainers.find("span:contains('Status')");
        if (statusContainer.length === 0)
            return "";
        const status = statusContainer[0].next.data || "";
        const result = string_1.normalizeString(status);
        return result;
    }
    _parseDescription(html) {
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
    parse(url) {
        return __awaiter(this, void 0, void 0, function* () {
            const html = yield this._fetchData(url);
            const description = this._parseDescription(html);
            const result = {
                description,
            };
            return result;
        });
    }
}
exports.default = GogoanimeDescription;
//# sourceMappingURL=GogoanimeDescription.js.map