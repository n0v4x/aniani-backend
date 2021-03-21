"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const ReleasesParser_1 = __importDefault(require("../helpers/parsers/gogoanime/ReleasesParser"));
const EpisodesParser_1 = __importDefault(require("../helpers/parsers/gogoanime/EpisodesParser"));
const Api_1 = __importStar(require("./Api"));
const Mp4uploadApi_1 = __importDefault(require("./Mp4uploadApi"));
const SeriesInfoParser_1 = __importDefault(require("../helpers/parsers/gogoanime/SeriesInfoParser"));
const array_1 = require("../helpers/common/array");
const utils_1 = require("../helpers/utils");
class GogoanimeApi extends Api_1.default {
    constructor() {
        super();
        this._releasesParser = new ReleasesParser_1.default();
        this._episodesParser = new EpisodesParser_1.default();
        this._seriesInfoParser = new SeriesInfoParser_1.default();
        this._mp4upload = new Mp4uploadApi_1.default();
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new GogoanimeApi();
        }
        return this.instance;
    }
    _buildReleasesUrl(page) {
        return `${process.env.RELEASES_SOURCE}?page=${page}`;
    }
    releases(page) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this._fetch(this._buildReleasesUrl(page));
            if (!data.html) {
                throw new Error("Releases: html not found");
            }
            const result = this._releasesParser.parse(data.html);
            return result;
        });
    }
    _buildEpisodesUrl(seriesId) {
        return `${process.env.EPISODES_SOURCE}/${seriesId}`;
    }
    episodes(seriesId) {
        return __awaiter(this, void 0, void 0, function* () {
            let result;
            try {
                const data = yield this._fetch(this._buildEpisodesUrl(seriesId));
                if (!data.html) {
                    throw new Error("html not found");
                }
                result = this._episodesParser.parse(data.html);
            }
            catch (e) {
                throw new Api_1.ApiError(e.message, "episodes");
            }
            return result;
        });
    }
    _seriesInfoUrl(seriesId) {
        return `${process.env.DESCRIPTION_SOURCE}/${seriesId}`;
    }
    seriesInfo(seriesId) {
        return __awaiter(this, void 0, void 0, function* () {
            let result;
            try {
                const html = yield this._fetch(this._seriesInfoUrl(seriesId));
                result = this._seriesInfoParser.parse(html);
            }
            catch (e) {
                throw new Api_1.ApiError(e.message, "series info");
            }
            return result;
        });
    }
    _buildPlayerSrcUrl(seriesId, episodeId, serverId) {
        return `${process.env.EPISODE_SOURCE}?filmId=${seriesId}&server=${serverId}&episode=${episodeId}`;
    }
    _player(seriesId, episodeId, serverId) {
        return __awaiter(this, void 0, void 0, function* () {
            let result;
            try {
                const data = yield this._fetch(this._buildPlayerSrcUrl(seriesId, episodeId, serverId));
                if (!data.target) {
                    throw new Error("Player: src url not found");
                }
                result = {
                    url: data.target,
                    serverId,
                };
            }
            catch (e) {
                throw new Api_1.ApiError(e.message, "player");
            }
            return result;
        });
    }
    _video(player) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = this._mp4upload.video(player.url);
            return result;
        });
    }
    _episodeById(episodeId) {
        return (episode) => episode.altId === episodeId;
    }
    series(seriesId, episodeId) {
        return __awaiter(this, void 0, void 0, function* () {
            const episodes = yield this.episodes(seriesId);
            const episode = episodes.find(this._episodeById(episodeId)) || array_1.last(episodes);
            const player = yield this._player(seriesId, episode.id, utils_1.PlayersIds.Default);
            const video = yield this._video(player);
            const seriesInfo = yield this.seriesInfo(seriesId);
            const result = {
                id: seriesId,
                video,
                info: seriesInfo,
                currentEpisode: episode,
                episodes,
            };
            return result;
        });
    }
}
exports.default = GogoanimeApi;
//# sourceMappingURL=GogoanimeApi.js.map