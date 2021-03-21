"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Parser_1 = require("../Parser");
class StreamtapePlayerParser extends Parser_1.Parser {
    _normalizeUrlToVideoSrc(urlToVideoSrc) {
        const result = `https:${urlToVideoSrc}`;
        return result;
    }
    _parseUrlToVideoSrc($) {
        const rawUrl = $("#videolink").text();
        const result = this._normalizeUrlToVideoSrc(rawUrl);
        return result;
    }
    parse(html) {
        const $ = this._loadHtml(html);
        const urlToVideoSrc = this._parseUrlToVideoSrc($);
        const result = {
            urlToVideoSrc,
        };
        return result;
    }
}
exports.default = StreamtapePlayerParser;
//# sourceMappingURL=StreamtapePlayer.js.map