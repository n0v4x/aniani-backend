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
exports.fetchDescription = void 0;
const GogoanimeDescription_1 = __importDefault(require("../../helpers/parsers/gogoanime/GogoanimeDescription"));
const descriptionParser = new GogoanimeDescription_1.default();
function makeSourceUrl(animeId) {
    return `${process.env.DESCRIPTION_SOURCE}/${animeId}`;
}
function fetchDescription(animeId) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = makeSourceUrl(animeId);
        const { description } = yield descriptionParser.parse(url);
        return description;
    });
}
exports.fetchDescription = fetchDescription;
//# sourceMappingURL=description.js.map