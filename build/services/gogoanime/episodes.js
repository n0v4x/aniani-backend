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
exports.fetchEpisodes = void 0;
const GogoanimeEpisodes_1 = __importDefault(require("../../helpers/parsers/gogoanime/GogoanimeEpisodes"));
const episodesParser = new GogoanimeEpisodes_1.default();
function makeEpisodesUrl(animeId) {
    return `${process.env.EPISODES_SOURCE}/${animeId}`;
}
function fetchEpisodes(animeId) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = makeEpisodesUrl(animeId);
        const { episodes } = yield episodesParser.parse(url);
        return episodes;
    });
}
exports.fetchEpisodes = fetchEpisodes;
//# sourceMappingURL=episodes.js.map