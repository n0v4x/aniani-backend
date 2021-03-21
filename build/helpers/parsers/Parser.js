"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parser = void 0;
const cheerio_1 = __importDefault(require("cheerio"));
class Parser {
    _loadHtml(html) {
        return cheerio_1.default.load(html);
    }
}
exports.Parser = Parser;
//# sourceMappingURL=Parser.js.map