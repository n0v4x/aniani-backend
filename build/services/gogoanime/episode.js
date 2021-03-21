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
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchEpisode = void 0;
const array_1 = require("../../helpers/common/array");
const episodes_1 = require("./episodes");
const episodeSrc_1 = require("./episodeSrc");
const description_1 = require("./description");
function episodeByName(episodeId) {
    return function (episode) {
        return episode.name === episodeId;
    };
}
function fetchEpisode(animeId, episodeId) {
    return __awaiter(this, void 0, void 0, function* () {
        const episodes = yield episodes_1.fetchEpisodes(animeId);
        const episode = episodes.find(episodeByName(episodeId)) || array_1.last(episodes);
        const src = yield episodeSrc_1.fetchEpisodeSrc(animeId, episode.id);
        const description = yield description_1.fetchDescription(animeId);
        const result = {
            id: animeId,
            src,
            description,
            episode,
            episodes,
        };
        return result;
    });
}
exports.fetchEpisode = fetchEpisode;
//# sourceMappingURL=episode.js.map