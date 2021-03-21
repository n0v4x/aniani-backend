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
const Api_1 = __importDefault(require("./Api"));
const axios_1 = __importDefault(require("axios"));
const StreamtapePlayer_1 = __importDefault(require("../helpers/parsers/players/StreamtapePlayer"));
class StreamtapeApi extends Api_1.default {
    constructor() {
        super();
        this._playerParser = new StreamtapePlayer_1.default();
    }
    _videoSrc(urlToVideoSrc) {
        return __awaiter(this, void 0, void 0, function* () {
            const { headers } = yield axios_1.default.get(urlToVideoSrc, {
                maxRedirects: 0,
                validateStatus: (status) => status === 302,
            });
            return headers.location;
        });
    }
    video(playerUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            const html = yield this._fetch(playerUrl);
            const player = this._playerParser.parse(html);
            const src = yield this._videoSrc(player.urlToVideoSrc);
            const result = {
                src,
            };
            return result;
        });
    }
}
exports.default = StreamtapeApi;
//# sourceMappingURL=StreamtapeApi.js.map