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
exports.fetchEpisodeSrc = void 0;
const axios_1 = __importDefault(require("axios"));
const Mp4uploadPlayer_1 = __importDefault(require("../../helpers/parsers/players/Mp4uploadPlayer"));
const mp4uploadPlayerParser = new Mp4uploadPlayer_1.default();
function makeSourceUrl(animeId, episodeId, serverId = process.env.MP4UPLOAD_SERVER_ID) {
    return `${process.env.EPISODE_SOURCE}?filmId=${animeId}&server=${serverId}&episode=${episodeId}`;
}
function fetchEpisodeSrc(animeId, episodeId) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = makeSourceUrl(animeId, episodeId);
        const { data: episodeSrcInfo } = yield axios_1.default.get(url);
        if (!episodeSrcInfo.target)
            throw new Error("Episode src url not found");
        const playerData = yield mp4uploadPlayerParser.parse(episodeSrcInfo.target);
        if (!playerData.src)
            throw new Error("Episode src not found");
        return playerData.src;
    });
}
exports.fetchEpisodeSrc = fetchEpisodeSrc;
//# sourceMappingURL=episodeSrc.js.map