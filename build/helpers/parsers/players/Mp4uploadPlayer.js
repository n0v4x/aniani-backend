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
const Parser_1 = require("../Parser");
var VideoSrcParts;
(function (VideoSrcParts) {
    VideoSrcParts[VideoSrcParts["Protocol"] = 3] = "Protocol";
    VideoSrcParts[VideoSrcParts["Subdomain"] = 27] = "Subdomain";
    VideoSrcParts[VideoSrcParts["Domain"] = 2] = "Domain";
    VideoSrcParts[VideoSrcParts["TopLvlDomain"] = 1] = "TopLvlDomain";
    VideoSrcParts[VideoSrcParts["Port"] = 56] = "Port";
    VideoSrcParts[VideoSrcParts["Slug"] = 55] = "Slug";
    VideoSrcParts[VideoSrcParts["FileName"] = 12] = "FileName";
    VideoSrcParts[VideoSrcParts["FileExt"] = 25] = "FileExt";
})(VideoSrcParts || (VideoSrcParts = {}));
class Mp4uploadPlayer extends Parser_1.Parser {
    _getRawVideoInfo(html) {
        const data = (html.match(/('|")(\|com.*\|source)\1/) || [])[2];
        if (!data)
            throw new Error("Video info not found in html");
        const result = data.split("|");
        return result;
    }
    _getVideoSrcInfo(rawVideoInfo) {
        const protocol = rawVideoInfo[VideoSrcParts.Protocol];
        const hostname = `${rawVideoInfo[VideoSrcParts.Subdomain]}.${rawVideoInfo[VideoSrcParts.Domain]}.${rawVideoInfo[VideoSrcParts.TopLvlDomain]}`;
        const port = rawVideoInfo[VideoSrcParts.Port];
        const fileName = `${rawVideoInfo[VideoSrcParts.FileName]}.${rawVideoInfo[VideoSrcParts.FileExt]}`;
        const path = `${rawVideoInfo[VideoSrcParts.Slug]}/${fileName}`;
        const result = {
            protocol,
            hostname,
            port,
            path,
        };
        return result;
    }
    _videoSrcInfoToStr(videoSrcInfo) {
        const result = `${videoSrcInfo.protocol}://${videoSrcInfo.hostname}:${videoSrcInfo.port}/d/${videoSrcInfo.path}`;
        return result;
    }
    _parseVideoSrc(html) {
        const rawVideoInfo = this._getRawVideoInfo(html);
        const videoSrcInfo = this._getVideoSrcInfo(rawVideoInfo);
        const result = this._videoSrcInfoToStr(videoSrcInfo);
        return result;
    }
    parse(url) {
        return __awaiter(this, void 0, void 0, function* () {
            const html = yield this._fetchData(url);
            const videoSrc = this._parseVideoSrc(html);
            const result = {
                src: videoSrc,
            };
            return result;
        });
    }
}
exports.default = Mp4uploadPlayer;
//# sourceMappingURL=Mp4uploadPlayer.js.map