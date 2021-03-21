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
exports.fetchReleases = void 0;
const GogoanimeReleases_1 = __importDefault(require("../../helpers/parsers/gogoanime/GogoanimeReleases"));
const releasesParser = new GogoanimeReleases_1.default();
function makeReleasesUrl(page) {
    return `${process.env.RELEASES_SOURCE}?page=${page}`;
}
function fetchReleases(page) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = makeReleasesUrl(page);
        const { releases } = yield releasesParser.parse(url);
        return releases;
    });
}
exports.fetchReleases = fetchReleases;
//# sourceMappingURL=releases.js.map