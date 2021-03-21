"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Parser_1 = require("../Parser");
var VideoSrcPartsPos;
(function (VideoSrcPartsPos) {
    VideoSrcPartsPos[VideoSrcPartsPos["Protocol"] = 3] = "Protocol";
    VideoSrcPartsPos[VideoSrcPartsPos["Subdomain"] = 27] = "Subdomain";
    VideoSrcPartsPos[VideoSrcPartsPos["Domain"] = 2] = "Domain";
    VideoSrcPartsPos[VideoSrcPartsPos["TopLvlDomain"] = 1] = "TopLvlDomain";
    VideoSrcPartsPos[VideoSrcPartsPos["Port"] = 56] = "Port";
    VideoSrcPartsPos[VideoSrcPartsPos["Slug"] = 55] = "Slug";
    VideoSrcPartsPos[VideoSrcPartsPos["FileName"] = 12] = "FileName";
    VideoSrcPartsPos[VideoSrcPartsPos["FileExt"] = 25] = "FileExt";
})(VideoSrcPartsPos || (VideoSrcPartsPos = {}));
class Mp4uploadPlayerParser extends Parser_1.Parser {
    _getRawDataParts(html) {
        const data = (html.match(/('|")(\|com.*\|source)\1/) || [])[2];
        if (!data)
            throw new Error("Video parts not found in html");
        const result = data.split("|");
        return result;
    }
    _getVideoSrcParts(rawDataParts) {
        const protocol = rawDataParts[VideoSrcPartsPos.Protocol];
        const hostname = `${rawDataParts[VideoSrcPartsPos.Subdomain]}.${rawDataParts[VideoSrcPartsPos.Domain]}.${rawDataParts[VideoSrcPartsPos.TopLvlDomain]}`;
        const port = rawDataParts[VideoSrcPartsPos.Port];
        const fileName = `${rawDataParts[VideoSrcPartsPos.FileName]}.${rawDataParts[VideoSrcPartsPos.FileExt]}`;
        const path = `${rawDataParts[VideoSrcPartsPos.Slug]}/${fileName}`;
        const result = {
            protocol,
            hostname,
            port,
            path,
        };
        return result;
    }
    _videoSrcPartsToStr(videoSrcParts) {
        const result = `${videoSrcParts.protocol}://${videoSrcParts.hostname}:${videoSrcParts.port}/d/${videoSrcParts.path}`;
        return result;
    }
    _parseVideoSrc(html) {
        const rawDataParts = this._getRawDataParts(html);
        const videoSrcParts = this._getVideoSrcParts(rawDataParts);
        const result = this._videoSrcPartsToStr(videoSrcParts);
        return result;
    }
    _parseMp4uploadPlayer(html) {
        const src = this._parseVideoSrc(html);
        const result = {
            src,
        };
        return result;
    }
    parse(html) {
        const result = this._parseMp4uploadPlayer(html);
        return result;
    }
}
exports.default = Mp4uploadPlayerParser;
//# sourceMappingURL=Mp4uploadPlayerParser.js.map