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
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const fs = __importStar(require("fs"));
const StreamtapePlayer_1 = __importDefault(require("./helpers/parsers/players/StreamtapePlayer"));
const Mp4uploadPlayerParser_1 = __importDefault(require("./helpers/parsers/players/Mp4uploadPlayerParser"));
const SeriesInfoParser_1 = __importDefault(require("./helpers/parsers/gogoanime/SeriesInfoParser"));
const ReleasesParser_1 = __importDefault(require("./helpers/parsers/gogoanime/ReleasesParser"));
const EpisodesParser_1 = __importDefault(require("./helpers/parsers/gogoanime/EpisodesParser"));
const GogoanimeApi_1 = __importDefault(require("./services/GogoanimeApi"));
const player = fs.readFileSync("./data-examples/player-info.html", "utf-8");
const description = fs.readFileSync("./data-examples/description.html", "utf-8");
const releases = fs.readFileSync("./data-examples/list-of-anime.html", "utf-8");
const episodes = fs.readFileSync("./data-examples/list-of-episodes.html", "utf-8");
// const mp4uploadPlayerParser = new Player();
const descriptionParser = new SeriesInfoParser_1.default();
const releasesParser = new ReleasesParser_1.default();
const episodesParser = new EpisodesParser_1.default();
const mp4uploadPlayerParser = new Mp4uploadPlayerParser_1.default();
const streamTypePlayerParser = new StreamtapePlayer_1.default();
const api = GogoanimeApi_1.default.getInstance();
(() => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(await api.releases());
    // console.log(await api.episodes("ylqx"));
    // console.log(await api.series("ylqx", "2"));
}))();
// console.log(releasesParser.parse(releases));
// console.log(episodesParser.parse(episodes));
// console.log(descriptionParser.parse(description));
//# sourceMappingURL=test.js.map