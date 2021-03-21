"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
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
class Player {
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
    parseVideoSrc(html) {
        const rawVideoInfo = this._getRawVideoInfo(html);
        const videoSrcInfo = this._getVideoSrcInfo(rawVideoInfo);
        const result = this._videoSrcInfoToStr(videoSrcInfo);
        return result;
    }
    parse(html) {
        const src = this.parseVideoSrc(html);
        const result = {
            src,
        };
        return result;
    }
}
exports.Player = Player;
//# sourceMappingURL=Player.js.map