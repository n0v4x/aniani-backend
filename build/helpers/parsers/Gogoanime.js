"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cheerio_1 = __importDefault(require("cheerio"));
const string_1 = require("../common/string");
class Gogoanime {
    _formatReleaseType(type) {
        return string_1.normalizeString(type).toLowerCase();
    }
    _formatReleaseEpisode(episode) {
        return string_1.normalizeString(episode.replace(/^\s*ep\s*/i, "")).toLowerCase();
    }
    _formatReleaseName(name) {
        return string_1.normalizeString(name).toLowerCase();
    }
    _parseReleaseId(url) {
        const tokens = url.split("-");
        const result = tokens[tokens.length - 1];
        return result;
    }
    _parseRelease($, releaseContainer) {
        const nameContaienr = $(releaseContainer).find(".name a");
        const id = this._parseReleaseId(nameContaienr.attr("href"));
        const name = this._formatReleaseName(nameContaienr.text());
        const img = $(releaseContainer).find(".img img").attr("src");
        const type = this._formatReleaseType($(releaseContainer).find(".type").text());
        const episode = this._formatReleaseEpisode($(releaseContainer).find(".episode").text());
        return {
            id,
            name,
            img,
            type,
            episode,
        };
    }
    parseListOfReleases(html) {
        const $ = cheerio_1.default.load(html);
        const result = [];
        $("li").each((_, releaseContainer) => {
            const release = this._parseRelease($, releaseContainer);
            result.push(release);
        });
        return result;
    }
    _parseEpisode($, episodeContainer) {
        const id = $(episodeContainer).attr("data-name");
        const name = $(episodeContainer).attr("data-name-normalized");
        const serversIds = $(episodeContainer).attr("data-servers").split(",");
        const available = serversIds.includes(process.env.MP4UPLOAD_SERVER_ID);
        return {
            id,
            name,
            available,
        };
    }
    parseListOfEpisodes(html) {
        const $ = cheerio_1.default.load(html);
        const result = [];
        $("li a").each((_, episodeContainer) => {
            const episode = this._parseEpisode($, episodeContainer);
            result.push(episode);
        });
        return result;
    }
    _parseDescriptionGenres($, dataContainers) {
        const result = [];
        const genresContainer = dataContainers.has("span:contains('Genre')");
        $(genresContainer)
            .find("a")
            .each((_, genreContainer) => {
            const genre = $(genreContainer).text();
            result.push(genre);
        });
        return result;
    }
    _parseDescriptionDate($, dataContainers) {
        const dateContainer = dataContainers.find("span:contains('Date aired')");
        const dateTokens = (dateContainer[0].next.data || "").split("to");
        const startDate = dateTokens[0].trim();
        const endDate = dateTokens[1].trim();
        const result = {
            start: startDate,
            end: endDate,
        };
        return result;
    }
    _parseDescriptionStatus($, dataContainers) {
        const statusContainer = dataContainers.find("span:contains('Status')");
        const status = statusContainer[0].next.data || "";
        const result = string_1.normalizeString(status);
        return result;
    }
    parseDescription(html) {
        const $ = cheerio_1.default.load(html);
        const img = $(".thumnail_tool img").attr("src");
        const name = $(".bigChar").text().trim();
        const dataContainers = $(".type");
        const genres = this._parseDescriptionGenres($, dataContainers);
        const date = this._parseDescriptionDate($, dataContainers);
        const status = this._parseDescriptionStatus($, dataContainers);
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
exports.default = Gogoanime;
//# sourceMappingURL=Gogoanime.js.map