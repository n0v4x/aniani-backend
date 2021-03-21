"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeString = exports.removeExtraSpaces = void 0;
function removeExtraSpaces(str) {
    return str.replace(/\s{2,}/g, " ");
}
exports.removeExtraSpaces = removeExtraSpaces;
function normalizeString(str) {
    return removeExtraSpaces(str.trim().replace(/\n\r?/g, " "));
}
exports.normalizeString = normalizeString;
//# sourceMappingURL=string.js.map